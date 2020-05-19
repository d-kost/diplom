import React, { useState, useEffect, useCallback } from 'react';
import '../../sass/DataTable.sass';
import TopHeader from './TopHeader';
import LeftHeader from './LeftHeader';
import ValuesArea from './ValuesArea';
import PropTypes from 'prop-types';
import * as queryHelper from '../../js_modules/queryHelper';
import { changeHeader } from '../../js_modules/tableHeaderHelper';

const DataTable = (props) => {

  const [topHeaderTree, setTopHeaderTree] = useState([]); //useState(props.topHeaderTree);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]); //useState(props.leftHeaderTree);

  const [topHeaderKeys, setTopHeaderKeys] = useState([]);
  const [leftHeaderKeys, setLeftHeaderKeys] = useState([]);

  const [obtainedValues, setObtainedValues] = useState();
  const [queryParams, setQueryParams] = useState({});


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
    console.log('dataTable changed props', props.topHeaderTree);

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



  return (
    <div className="data-table">

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
        />

      </div>

    </div>
  )

}

DataTable.propTypes = {
  topHeaderTree: PropTypes.arrayOf(PropTypes.object),
  leftHeaderTree: PropTypes.arrayOf(PropTypes.object)
}

export default DataTable;