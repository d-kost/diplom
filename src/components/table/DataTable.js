import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../sass/DataTable.sass';
import TopHeader from './TopHeader';
import LeftHeader from './LeftHeader';
import ValuesArea from './ValuesArea';
import PropTypes from 'prop-types';
import * as queryHelper from '../../js_modules/queryHelper';
import { changeHeader } from '../../js_modules/tableHeaderHelper';
import sassVars from '../../sass/_vars.scss';
import { buildKeys } from '../../js_modules/keyBuilder';

const DataTable = (props) => {

  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);

  const [topHeaderKeys, setTopHeaderKeys] = useState([]);
  const [leftHeaderKeys, setLeftHeaderKeys] = useState([]);

  const [hashTable, setHashTable] = useState();
  const [queryParams, setQueryParams] = useState({});

  const [scrollData, setScrollData] = useState({});

  const emptyBlockRef = useRef(null);
  const leftHeaderRef = useRef(null);
  const dataTableRef = useRef(null);


  const getKeysFromHeader = useCallback((header) => {
    return buildKeys(header);
  }, [])


  useEffect(() => {

    setTopHeaderTree(props.topHeaderTree);
    setLeftHeaderTree(props.leftHeaderTree);
    setHashTable(props.hashTable);

    setQueryParams(props.queryParams);

    let topKeys = getKeysFromHeader(props.topHeaderTree);
    let leftKeys = getKeysFromHeader(props.leftHeaderTree);

    setTopHeaderKeys(topKeys);
    setLeftHeaderKeys(leftKeys);

    setScrollData({
      scrollLeft: 0,
      scrollTop: 0
    });

    if (dataTableRef.current.scrollLeft !== 0) {
      dataTableRef.current.scrollLeft = 0;
    }
    if (dataTableRef.current.scrollTop !== 0) {
      dataTableRef.current.scrollTop = 0;
    }

  },
    [props.topHeaderTree, props.leftHeaderTree,
      getKeysFromHeader, props.queryParams, props.hashTable]
  )



  const openBtnClick = (node, isTop) => {
    let path = node.path.slice();
    let newHeader = isTop ?
      leftHeaderTree.slice() : topHeaderTree.slice();

    let changedHeader = changeHeader(path, newHeader);
    let keys = getKeysFromHeader(changedHeader.header);

    let newQueryParams = Object.assign({}, queryParams);
    let newQueryValues = [];

    //if isOpened add children ids to queryParams values
    if (changedHeader.isOpened) {
      //сделать так, чтобы запрос формировался не для всех значений
      //а только для новых из текущего заголовка + для всех из противоположного
      newQueryValues = queryHelper.getListValues(node.Children, changedHeader.Abbr, newQueryParams.values);
      newQueryParams.values[changedHeader.Abbr].push(...newQueryValues);
    }


    let query = queryHelper.getDataTableQuery(newQueryParams);



    if (newQueryValues.length !== 0) {
      fetch(query)
        .then(response => response.json())
        .then(json => {
          let newHashTable = queryHelper.getHashTable(json, hashTable);
          setHashTable(newHashTable)
          console.log('query', query);

          updateState(isTop, changedHeader.header, keys);
          setQueryParams(newQueryParams);
        })

    } else {
      updateState(isTop, changedHeader.header, keys);
    }
  }


  const updateState = (isTop, header, keys) => {
    if (isTop) {
      setLeftHeaderTree(header);
      setLeftHeaderKeys(keys);
    } else {
      setTopHeaderTree(header);
      setTopHeaderKeys(keys);
    }
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

  const resizeEmptyBlock = () => {       
    // let verticalWidth = document.querySelector('.data-table__left-header').clientWidth;
    let verticalWidth = leftHeaderRef.current.clientWidth;
    // let emptyBlock = document.querySelector('.empty-block');
    console.log('resizeEmptyBlock');

    if (verticalWidth !== emptyBlockRef.current.clientWidth) {
      emptyBlockRef.current.style.minWidth = verticalWidth + 'px';
    }
  }


  return (
    <div className="data-table" onScroll={onScroll} ref={dataTableRef}>

      {/* {console.log('topHeaderTree', topHeaderTree)} */}
      <div className='data-table__top-header-wrapper'>
        <div className="empty-block" ref={emptyBlockRef}></div>
        <TopHeader
          headerTree={topHeaderTree}
          openBtnClick={openBtnClick}
        />
      </div>

      <div className="data-table__content-wrapper">
        <div className="data-table__left-header" ref={leftHeaderRef}>
          <LeftHeader
            headerTree={leftHeaderTree}
            openBtnClick={openBtnClick}
            resizeEmptyBlock={resizeEmptyBlock}
          />
        </div>

        <ValuesArea
          hashTable={hashTable}
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
  hashTable: PropTypes.instanceOf(Map),
  queryParams: PropTypes.shape({
    topHdr: PropTypes.arrayOf(PropTypes.string),
    leftHdr: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.object
  })
}

export default DataTable;