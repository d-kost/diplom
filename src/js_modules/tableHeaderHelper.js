export const createHeaderTree = (header, values) => {
  let level = 0;
  let result = [];
  result = createLevel(level, header, values, []);

  return result;
}


const createLevel = (level, header, values, parentIndexes) => {
  let result = [];

  values[header[level].Abbr].forEach((item, i) => {
    //item : {ID, Name, Children}
    let newItem = JSON.parse(JSON.stringify(item));
    //open first level
    newItem.isOpened = level === 0 ? true : false;
    newItem.Abbr = header[level].Abbr;

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

    if (newItem.isOpened) {
      newItem.Children = createNewPropertiesToChildren(newItem);
    }

  })

  return result;
}


export const changeHeader = (path, header) => {
  //targetNode - узел, который ищется по заданному path
  let targetNode = header[path.shift()];

  //не должно работать но работает
  path.forEach(step => {

    if (!step.isChildren && targetNode.nextLevel) {
      targetNode = targetNode.nextLevel;
    } else if (step.isChildren && targetNode.Children) {
      targetNode = targetNode.Children;
    }

    targetNode = targetNode[step.index];

  });

  targetNode.isOpened = !targetNode.isOpened;
  if (targetNode.isOpened) {
    targetNode.Children = createNewPropertiesToChildren(targetNode);
  }

  return { header, isOpened: targetNode.isOpened, Abbr: targetNode.Abbr };
}


const createNewPropertiesToChildren = (node) => {
  if (node.Children) {
    node.Children.forEach((child, i) => {
      if (!child.hasOwnProperty('isOpened')) {
        child.isOpened = false;
        child.Abbr = node.Abbr;
        //isChildren: true - path to children
        child.path = [...node.path, { isChildren: true, index: i }];

        if (node.nextLevel) {
          child.nextLevel = getNextLevelForChild(node.nextLevel, child.path);
        }

      }
    })
  }
  //возвращать children или ничего, т.к. изменяется по ссылке
  return node.Children;
}


const getNextLevelForChild = (parentLevel, prevPath) => {
  let level = JSON.parse(JSON.stringify(parentLevel));

  let result = goAllPaths(level, prevPath);

  return result;
}


const goAllPaths = (level, prevPath) => {

  level.forEach((node, i) => {
    node.isOpened = false;
    node.path = [...prevPath, { isChildren: false, index: i }];

    if (node.Children) {
      node.Children.forEach(child => {
        if (child.hasOwnProperty('isOpened')) {
          delete child.isOpened;
          delete child.path;
          delete child.nextLevel;
        }
      });
    }

    if (node.nextLevel) {
      node.nextLevel = goAllPaths(node.nextLevel, node.path);
    }

  })

  return level;
}