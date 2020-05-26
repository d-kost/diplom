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