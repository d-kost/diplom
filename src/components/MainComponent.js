import React, { useEffect, useState } from 'react';
// import Table from './table/Table';
import DimensionSelection from './dimensions/DimensionSelection';

function MainComponent() {

  const [dimensions, setDimensions] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/dims')
      .then(response => response.json())
      .then(json => setDimensions(json))
  }, [])


  const onApplyClick = (singleValues, leftHeader, topHeader, values) => {
    let hdr = [];

    hdr.push(...createQueryHeader(leftHeader));
    hdr.push(...createQueryHeader(topHeader));

    let params = createQueryParams(values);

    let query = `http://localhost:8080/vals?hdr=${hdr}${params}`;

    console.log('query', query);
  }


  const createQueryHeader = (header) => {
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
      {dimensions.length &&
        <DimensionSelection
          dimensions={dimensions}
          onApplyClick={onApplyClick}
        />
      }


      {/* <Table/> */}
    </div>
  )
}

export default MainComponent;
