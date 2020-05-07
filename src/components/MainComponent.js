import React, { useEffect, useState } from 'react';
import DataTable from './table/DataTable';
import DimensionSelection from './dimensions/DimensionSelection';

function MainComponent() {

  const [dimensions, setDimensions] = useState([]);
  const [topHeaderTree, setTopHeaderTree] = useState([]);
  const [leftHeaderTree, setLeftHeaderTree] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/dims')
      .then(response => response.json())
      .then(json => setDimensions(json))
  }, [])


  const onApplyClick = (singleValues, leftH, topH, values) => {
    let hdr = [];

    hdr.push(...createQueryHdr(leftH));
    hdr.push(...createQueryHdr(topH));

    let params = createQueryParams(values);

    let query = `http://localhost:8080/vals?hdr=${hdr}${params}`;

    console.log('query', query);
    
    setTopHeaderTree(createHeaderTree(topH, values));
    setLeftHeaderTree(createHeaderTree(leftH, values));
  }

  const createHeaderTree = (header, values) => {
    let i = 0;
    let result = [];
    result = createLevel(i, header, values, []);
    console.log('testFunction', result);
    return result;

  }

  const createLevel = (level, header, values, parentIndexes) => {
    let result = [];

    values[header[level].Abbr].forEach((item, i) => {
      //item : {ID, Name, Children}
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.isOpened = false;

      if (parentIndexes.length > 0) {
        //isChildren: false - path to values
        newItem.path = [...parentIndexes, { isChildren: false, index: i }];
      } else {
        newItem.path = [i];
      }


      result.push(newItem);

      if (header[level + 1]) {
        newItem.nextLevel = createLevel(level + 1, header, values, newItem.path);
      }
    })

    return result;
  }

  const createQueryHdr = (header) => {
    return header.map(dimension => dimension.Abbr);
  }

  const createQueryParams = (values) => {
    let params = '';

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        params += `&${key}=`;

        if (values[key] != null) {
          params += values[key].map(value => value ? value.ID : '').join(',');
        }

      }
    }
    return params;
  }



  return (
    <div>
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
        />}
    </div>
  )
}

export default MainComponent;
