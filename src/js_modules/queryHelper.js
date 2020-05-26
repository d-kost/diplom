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


export const getHashTable = (valsArray, existingMap) => {
  if (existingMap) {
    existingMap = new Map(existingMap);
  } else {
    existingMap = new Map();
  }

  valsArray.forEach(nestedArray => {
    let value = nestedArray.shift();
    existingMap.set(nestedArray.join(' '), value);
  })

  return existingMap;
}


export const getAllDimensionsValuesIds = (values) => {
  let valuesIds = {};

  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      valuesIds[[key]] =
        values[key].map(value => value ? value.ID : null);
    }
  }

  return valuesIds;
}


export const getListValues = (nodeList, abbr, queryParamsValues) => {
  let values = [];

  nodeList.forEach(node => {
    // if (!queryParams.values[abbr].includes(node.ID)) {
    if (!queryParamsValues[abbr].includes(node.ID)) {
      values.push(node.ID);
    }
  });

  return values;
}

