import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../sass/DataTable.sass';
import TopHeader from './TopHeader';
import LeftHeader from './LeftHeader';
import ValuesArea from './ValuesArea';
import PropTypes from 'prop-types';
import * as queryHelper from '../../js_modules/queryHelper';
import { changeHeader } from '../../js_modules/tableHeaderHelper';
import sassVars from '../../sass/_vars.scss';
import { getHashTable, buildKeys } from '../../js_modules/hashTableHelper';
import ErrorComponent from '../error/ErrorComponent';

const DataTable = (props) => {

  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);

  const [topHeaderKeys, setTopHeaderKeys] = useState([]);
  const [leftHeaderKeys, setLeftHeaderKeys] = useState([]);

  const [hashTable, setHashTable] = useState();
  const [queryParams, setQueryParams] = useState({});

  const [scrollData, setScrollData] = useState({});
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);

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


  const openBtnClick = (node, isLeft) => {
    try {
      let path = node.path.slice();
      let newHeader = isLeft ?
        leftHeaderTree.slice() : topHeaderTree.slice();

      let changedHeader = changeHeader(path, newHeader);
      let keys = getKeysFromHeader(changedHeader.header);

      let newQueryParams = Object.assign({}, queryParams);
      let newQueryValues = [];

      //if isOpened add children ids to queryParams values
      if (changedHeader.isOpened) {
        //get list of ids of new nodes 
        newQueryValues = queryHelper.getListValues(node.Children, changedHeader.Abbr, newQueryParams.values);
        newQueryParams.values[changedHeader.Abbr].push(...newQueryValues);
      }


      if (newQueryValues.length !== 0) {

        //запрос формируется не для всех значений текущего уровня заголовка
        //а только для новых + для остальных уровней и противоположного заголовка
        let query = queryHelper.getDataTableQuery(
          {
            ...newQueryParams,
            values: {
              ...newQueryParams.values,
              [changedHeader.Abbr]: newQueryValues
            }
          }
        );

        fetch(query)
          .then(response => response.json(),
            () => setServerError(true))
          .then(json => {
            if (json) {
              let newHashTable = getHashTable(json, hashTable);
              setHashTable(newHashTable)
              console.log('query', query);

              updateState(isLeft, changedHeader.header, keys);
              setQueryParams(newQueryParams);

              if (serverError) {
                setServerError(false);
              }
            }
          })

      } else {
        updateState(isLeft, changedHeader.header, keys);
      }
    } catch {
      setError(true);
    }
  }


  const updateState = (isLeft, header, keys) => {
    if (isLeft) {
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
    if (!leftHeaderRef.current || !emptyBlockRef.current) {
      return;
    }

    let leftHeaderWidth = leftHeaderRef.current.clientWidth;

    if (leftHeaderWidth !== emptyBlockRef.current.clientWidth) {
      emptyBlockRef.current.style.minWidth = leftHeaderWidth + 'px';
    }
  }


  return (
    <>
      {(error || serverError) &&
        <ErrorComponent
          error={error}
          serverError={serverError}
        />}

      <div className="data-table" onScroll={onScroll} ref={dataTableRef}>
        {/* {console.log('data-table render')} */}

        {!error &&
          <>
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
          </>}
      </div>
    </>
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