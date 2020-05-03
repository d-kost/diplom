import React, { useEffect, useState } from 'react';
import DataTable from './table/DataTable';
import DimensionSelection from './dimensions/DimensionSelection';

function MainComponent() {

  const [dimensions, setDimensions] = useState([]);
  const [leftHeader, setLeftHeader] = useState([]);
  const [topHeader, setTopHeader] = useState([]);
  const [headerValues, setHeaderValues] = useState({});


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
    console.log('topH', topH);
    console.log('values', values);
    setLeftHeader(leftH);
    setTopHeader(topH);
    setHeaderValues(values)
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
      {dimensions.length &&
        <DimensionSelection
          dimensions={dimensions}
          onApplyClick={onApplyClick}
        />
      }

      <DataTable
        tNodes={topHeader}
        lNodes={leftHeader}
        headerValues={headerValues}
      />
    </div>
  )
}

export default MainComponent;
