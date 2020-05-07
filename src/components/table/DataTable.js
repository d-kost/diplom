import React, { Component } from 'react';
import '../../sass/Table.sass';
import TopHeader from './TopHeader';
import LeftHeader from './LeftHeader';
// import Field from './Field';
import PropTypes from 'prop-types';

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topHeaderTree: this.props.topHeaderTree,
      leftHeaderTree: this.props.leftHeaderTree
    }

    this.openBtnClick = this.openBtnClick.bind(this);

  }




  openBtnClick(node, isTop) {
    console.log('btnClick', node);
    let path = node.path.slice();
    let headerCopy = isTop ?
      this.state.leftHeaderTree.slice() : this.state.topHeaderTree.slice();

    console.log('headerCopy begin', headerCopy);

    //targetNode - узел, который ищется по заданному path
    let targetNode = headerCopy[path.shift()];

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
      targetNode = this.createNewPropertiesToChildren(targetNode);
    }

    console.log('targetNode.isOpened', targetNode.isOpened);
    console.log('headerCopy end', headerCopy);


    if (isTop) {
      this.setState({
        leftHeaderTree: headerCopy
      })
    } else {
      this.setState({
        topHeaderTree: headerCopy
      })
    }
    

  }

  createNewPropertiesToChildren(node) {
    if (node.Children) {
      node.Children.forEach((child, i) => {
        if (!child.hasOwnProperty('isOpened')) {
          child.isOpened = false;
          //isChildren: true - path to children
          child.path = [...node.path, { isChildren: true, index: i }];

          if (node.nextLevel) {
            child.nextLevel = this.getNextLevelForChild(node.nextLevel, child.path);
            // child.nextLevel = JSON.parse(JSON.stringify(node.nextLevel));
          }

        }
      })
    }

    return node;
  }


  getNextLevelForChild(parentLevel, prevPath) {
    let level = JSON.parse(JSON.stringify(parentLevel));

    let result = this.goAllPaths(level, prevPath);

    return result;

  }


  goAllPaths(level, prevPath) {

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
        node.nextLevel = this.goAllPaths(node.nextLevel, node.path);
      }

    })

    return level;

  }


  render() {
    return (
      <div className="data-table">

        {console.log('topHeaderTree', this.state.topHeaderTree)}
        <div className='data-table__top-header-wrapper'>
          <div className="empty-block">empty</div>
          <TopHeader
            headerTree={this.state.topHeaderTree}
            openBtnClick={this.openBtnClick}
          />
        </div>

        <div className="data-table__content-wrapper">
          <LeftHeader
            headerTree={this.state.leftHeaderTree}
            openBtnClick={this.openBtnClick}
          />

          {/* <Field horizontalNodes={this.state.horizontalNodes}
            verticalNodes={this.state.verticalNodes} /> */}
        </div>

      </div>
    )
  }
}

DataTable.propTypes = {
  topHeaderTree: PropTypes.arrayOf(PropTypes.object),
  leftHeaderTree: PropTypes.arrayOf(PropTypes.object)
}

export default DataTable;