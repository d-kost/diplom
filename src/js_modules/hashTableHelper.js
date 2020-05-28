export const buildKeys = (header) => {
  let keys = [];
  processNextLevel(header, [], keys);

  return keys;
}


const processNextLevel = (level, prevIds, result) => {
  let ids = [];

  level.forEach(node => {

    if (!node.isOpened) {
      ids = [...prevIds, node.ID];

      if (node.nextLevel) {
        //go to nextLevel
        processNextLevel(node.nextLevel, ids, result);

      } else {
        //end node
        result.push(ids);
      }

    } else {

      ids = prevIds;
      if (node.Children) {
        //go to Children
        processNextLevel(node.Children, ids, result);
      }
    }
  })
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