import React, { useEffect, useState } from 'react';
import DataTable from './table/DataTable';
import DimensionSelection from './dimensions/DimensionSelection';
import * as queryHelper from '../js_modules/queryHelper';
import { createHeaderTree } from '../js_modules/tableHeaderHelper';
import { getHashTable } from '../js_modules/hashTableHelper';
import ErrorComoponent from './error/ErrorComponent';

function MainComponent() {

  const [dimensions, setDimensions] = useState([]);
  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);

  const [obtainedValuesForValuesArea, setObtainedValuesForValuesArea] = useState();
  const [queryParams, setQueryParams] = useState({});

  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);


  useEffect(() => {
    //get dimension list from server on mounting
    fetch(queryHelper.getDimensionsQuery())
      .then(response => response.json(),
        () => setServerError(true))
      .then(json => {
        if (json) {
          setDimensions(json);
        }
      })
  }, [])


  const onApplyClick = (leftH, topH, values) => {
    let queryParams = {
      topHdr: [],
      leftHdr: [],
      values: {}
    }

    try {
      queryParams.leftHdr = queryHelper.createQueryHdr(leftH);
      queryParams.topHdr = queryHelper.createQueryHdr(topH);
      queryParams.values = queryHelper.getAllDimensionsValuesIds(values);

      let topTree = createHeaderTree(topH, values);
      let leftTree = createHeaderTree(leftH, values);
      if (!topTree.length || !leftTree.length) {
        return;
      }

      queryParams.values = getChildrenValues(topTree, queryParams.values);
      queryParams.values = getChildrenValues(leftTree, queryParams.values);


      let query = queryHelper.getDataTableQuery(queryParams);
      console.log('query', query);

      fetch(query)
        .then(response => response.json(),
          () => setServerError(true))
        .then(json => {
          if (!json) {
            return;
          }
          let hashTable = getHashTable(json);
          setObtainedValuesForValuesArea(hashTable);

          setTopHeaderTree(topTree);
          setLeftHeaderTree(leftTree);

          setQueryParams(queryParams);

          if (serverError) {
            setServerError(false);
          }
        })

    } catch {
      setError(true);
    }

  }


  const getChildrenValues = (tree, paramValues) => {
    // let result = [];
    tree.forEach(node => {
      if (node.isOpened && node.Children) {
        paramValues[node.Abbr].push(
          ...queryHelper.getListValues(node.Children, node.Abbr, paramValues)
        );
      }
    });

    return paramValues;
  }


  return (
    <div className='app-container'>
      {dimensions.length !== 0 &&

        <DimensionSelection
          dimensions={dimensions}
          onApplyClick={onApplyClick}
        />
      }

      {!error &&
        topHeaderTree.length !== 0 &&
        leftHeaderTree.length !== 0 &&
        obtainedValuesForValuesArea !== null &&
        Object.keys(queryParams).length !== 0 &&

        <DataTable
          topHeaderTree={topHeaderTree}
          leftHeaderTree={leftHeaderTree}
          hashTable={obtainedValuesForValuesArea}
          queryParams={queryParams}
        />
      }

      {(error || serverError) &&
        <ErrorComoponent
          error={error}
          serverError={serverError}
        />}
    </div>
  )
}

export default MainComponent;
