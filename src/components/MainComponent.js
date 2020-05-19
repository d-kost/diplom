import React, { useEffect, useState } from 'react';
import DataTable from './table/DataTable';
import DimensionSelection from './dimensions/DimensionSelection';
import * as queryHelper from '../js_modules/queryHelper';
import { createHeaderTree } from '../js_modules/tableHeaderHelper';

function MainComponent() {

  const [dimensions, setDimensions] = useState([]);
  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);

  const [obtainedValuesForValuesArea, setObtainedValuesForValuesArea] = useState();
  const [queryParams, setQueryParams] = useState({});


  useEffect(() => {
    fetch(queryHelper.getDimensionsQuery())
      .then(response => response.json())
      .then(json => setDimensions(json))
  }, [])


  const onApplyClick = (singleValues, leftH, topH, values) => {
    let queryParams = {
      topHdr: [],
      leftHdr: [],
      values: []
    }

    queryParams.leftHdr = queryHelper.createQueryHdr(leftH);
    queryParams.topHdr = queryHelper.createQueryHdr(topH);

    queryParams.values = getValuesIds(values);//.map(value => value.ID);
    // queryParams.values = queryHelper.createQueryValues(values);

    let query = queryHelper.getDataTableQuery(queryParams);

    console.log('query', query);


    fetch(query)
      .then(response => response.json())
      .then(json => {
        let hashTable = queryHelper.getHashTable(json); 
        setObtainedValuesForValuesArea(hashTable);

        setTopHeaderTree(createHeaderTree(topH, values));
        setLeftHeaderTree(createHeaderTree(leftH, values));

        setQueryParams(queryParams);
      })

  }

  const getValuesIds = (values) => {
    let valuesIds = {};

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        valuesIds[[key]] =
        values[key].map(value => value ? value.ID : null);
      }
    }

    return valuesIds;
  }



  return (
    <div className='app-container'>
      {dimensions.length !== 0 &&
        <DimensionSelection
          dimensions={dimensions}
          onApplyClick={onApplyClick}
        />
      }

      {topHeaderTree.length !== 0 && leftHeaderTree.length !== 0 &&
        <DataTable
          topHeaderTree={topHeaderTree}
          leftHeaderTree={leftHeaderTree}
          obtainedValues={obtainedValuesForValuesArea}
          queryParams={queryParams}
        />}
    </div>
  )
}

export default MainComponent;
