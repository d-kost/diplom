export const getPreferredDimensions = (values, tables, dimensions) => {
  let tableIndexes = getIndicatorTablesIds(values);
  let preferredDimensions = {};

  tables.forEach(table => {

    if (tableIndexes.has(table.id)) {
      table.Fields.forEach(dimension => {

        let id = dimension.DimId;

        if (id > 0 && !preferredDimensions[id]) {
          preferredDimensions[id] = getDimensionNameAndAbbrById(id, dimensions);
        }
      })
    }
  })
  return preferredDimensions;
}


const getTableIds = (values, ids) => {
  //recursion stops when a table is found
  //because there are no tables inside the table

  values.forEach(value => {
    if (value.Table && !ids.has(value.Table)) {
      ids.add(value.Table);

    } else if (value.Children) {
      getTableIds(value.Children, ids);
    }
  })

  return ids;
}


const getIndicatorTablesIds = (values) => {
  let indexes = getTableIds(values, new Set());
  return indexes;
}


const getDimensionNameAndAbbrById = (id, dimensions) => {
  let dim = dimensions.find(dim => dim.id === id);
  return {RName: dim.RName, Abbr: dim.Abbr};
}