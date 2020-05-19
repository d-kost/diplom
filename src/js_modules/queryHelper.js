export const getDataTableQuery = (queryParams) => {
  let hdr = [...queryParams.leftHdr, ...queryParams.topHdr];
  let values = createQueryValues(queryParams.values);

  return `http://localhost:8080/vals?hdr=${hdr}${values}`;
}


export const createQueryHdr = (header) => {
  return header.map(dimension => dimension.Abbr);
}


export const getDimensionsQuery = () => {
  return 'http://localhost:8080/dims';
}


export const getDimensionValuesQuery = (abbr) => {
  return `http://localhost:8080/dim?abbr=${abbr}`;
}


const createQueryValues = (values) => {
  console.log('create query values');
  
  let valuesString = '';

  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      valuesString += `&${key}=`;

      if (values[key] != null) {
        valuesString += values[key].join(',');
      }

    }
  }
  return valuesString;
}

export const getHashTable = (valsArray, resultMap = new Map()) => {

  valsArray.forEach(nestedArray => {
    let value = nestedArray.shift();
    resultMap.set(nestedArray.join(' '), value);
  })

  return resultMap;
}

