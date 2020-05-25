import React, { useState, useEffect, useCallback } from 'react';
import '../../sass/DataTable.sass';
import TopHeader from './TopHeader';
import LeftHeader from './LeftHeader';
import ValuesArea from './ValuesArea';
import PropTypes from 'prop-types';
import * as queryHelper from '../../js_modules/queryHelper';
import { changeHeader } from '../../js_modules/tableHeaderHelper';
import sassVars from '../../sass/_vars.scss';

const DataTable = (props) => {

  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);

  const [topHeaderKeys, setTopHeaderKeys] = useState([]);
  const [leftHeaderKeys, setLeftHeaderKeys] = useState([]);

  const [obtainedValues, setObtainedValues] = useState();
  const [queryParams, setQueryParams] = useState({});

  const [scrollData, setScrollData] = useState({});

  const processNextLevel = useCallback((level, prevIds, result) => {
    let ids = [];

    level.forEach(node => {

      if (!node.isOpened) {
        ids = [...prevIds, node.ID];

        if (node.nextLevel) {
          //go to nextLevel
          processNextLevel(node.nextLevel, ids, result);

        } else {
          //end node
          result.push(ids);
        }

      } else {

        ids = prevIds;
        if (node.Children) {
          //go to Children
          processNextLevel(node.Children, ids, result);
        }
      }
    })
  }, [])


  const getKeysFromHeader = useCallback((header) => {
    let keys = [];
    processNextLevel(header, [], keys);

    return keys;
  }, [processNextLevel])


  useEffect(() => {
    // console.log('dataTable changed props', props.topHeaderTree);

    setScrollData({
      scrollLeft: 0,
      scrollTop: 0
    });

    setTopHeaderTree(props.topHeaderTree);
    setLeftHeaderTree(props.leftHeaderTree);
    setObtainedValues(props.obtainedValues);

    setQueryParams(props.queryParams);

    let topKeys = getKeysFromHeader(props.topHeaderTree);
    let leftKeys = getKeysFromHeader(props.leftHeaderTree);

    setTopHeaderKeys(topKeys);
    setLeftHeaderKeys(leftKeys);

  },
    [props.topHeaderTree, props.leftHeaderTree,
      getKeysFromHeader, props.queryParams, props.obtainedValues]
  )



  const openBtnClick = (node, isTop) => {
    let path = node.path.slice();
    let newHeader = isTop ?
      leftHeaderTree.slice() : topHeaderTree.slice();

    let changedHeader = changeHeader(path, newHeader);
    let keys = getKeysFromHeader(changedHeader.header);


    let newQueryParams = Object.assign({}, queryParams);

    //if isOpened add children ids to queryParams values
    if (changedHeader.isOpened) {

      newQueryParams.values[changedHeader.Abbr].push(
        ...getQueryValues(node.Children, changedHeader.Abbr)
      );

    }


    let query = queryHelper.getDataTableQuery(newQueryParams);
    //делать fetch только если изменилось что-то там...
    fetch(query)
      .then(response => response.json())
      .then(json => {
        queryHelper.getHashTable(json, obtainedValues);

        if (isTop) {
          setLeftHeaderTree(changedHeader.header);
          setLeftHeaderKeys(keys);
        } else {
          setTopHeaderTree(changedHeader.header);
          setTopHeaderKeys(keys);
        }

        setQueryParams(newQueryParams);

      })
  }


  const getQueryValues = (nodeList, abbr) => {
    let values = [];

    nodeList.forEach(node => {
      if (!queryParams.values[abbr].includes(node.ID)) {
        values.push(node.ID);
      }
    });

    return values;
  }


  const cellWidth = parseInt(sassVars.cellWidth, 10);
  const cellHeight = parseInt(sassVars.cellHeight, 10);

  const onScroll = (event) => {
    event.persist();
    let target = event.target;

    if ((target.scrollLeft - scrollData.scrollLeft >= cellWidth) ||
      (target.scrollTop - scrollData.scrollTop >= cellHeight)) {

      setScrollData({
        scrollLeft: target.scrollLeft,
        scrollTop: target.scrollTop
      });
    }


  }


  return (
    <div className="data-table" onScroll={onScroll}>

      {/* {console.log('topHeaderTree', topHeaderTree)} */}
      <div className='data-table__top-header-wrapper'>
        <div className="empty-block"></div>
        <TopHeader
          headerTree={topHeaderTree}
          openBtnClick={openBtnClick}
        />
      </div>

      <div className="data-table__content-wrapper">
        <LeftHeader
          headerTree={leftHeaderTree}
          openBtnClick={openBtnClick}
        />

        <ValuesArea
          obtainedValues={obtainedValues}
          topHeaderKeys={topHeaderKeys}
          leftHeaderKeys={leftHeaderKeys}
          scrollData={scrollData}
        />

      </div>

    </div>
  )

}

DataTable.propTypes = {
  topHeaderTree: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.number,
    Name: PropTypes.string,
    Children: PropTypes.arrayOf(PropTypes.object),
    path: PropTypes.arrayOf(PropTypes.number, PropTypes.object),
    Abbr: PropTypes.string,
    isOpened: PropTypes.bool
  })),
  leftHeaderTree: PropTypes.arrayOf(PropTypes.object),
  obtainedValues: PropTypes.instanceOf(Map),
  queryParams: PropTypes.shape({
    topHdr: PropTypes.arrayOf(PropTypes.string),
    leftHdr: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.object
  })
}

export default DataTable;