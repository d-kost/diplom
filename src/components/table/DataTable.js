import React, { Component } from 'react';
import '../../sass/Table.sass';
import TopHeader from './TopHeader';
// import LeftHeader from './LeftHeader';
// import Field from './Field';
import PropTypes from 'prop-types';

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      horizontalNodes: [],
      verticalNodes: [],
      topHeaderList: [],
      topHeaderTree: this.props.topHeaderTree
    }

    this.setupTopHeaderList = this.setupTopHeaderList.bind(this);
    this.openBtnClick = this.openBtnClick.bind(this);

  }


  setupTopHeaderList(newHeader) {
    this.setState({
      topHeaderList: newHeader
    })
  }


  setupLeftHeaderList(newElement) {
  }


  openBtnClick(node) {
    console.log('btnClick', node);
    let path = node.path.slice();
    let topHeaderCopy = this.state.topHeaderTree.slice();

    console.log('topHeaderCopy begin', topHeaderCopy);

    //targetNode - узел, который ищется по заданному path
    let targetNode = topHeaderCopy[path.shift()];

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
    console.log('topHeaderCopy end', topHeaderCopy);

    this.setState({
      topHeaderTree: topHeaderCopy
    })

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

      node.Children.forEach(child => {
        if (child.hasOwnProperty('isOpened')) {
          delete child.isOpened;
          delete child.path;
          delete child.nextLevel;
        }
      });

      if (node.nextLevel) {
        node.nextLevel = this.goAllPaths(node.nextLevel, node.path);
      }

    })

    return level;

  }


  render() {
    return (
      <div className="head">

        {console.log('topHeaderTree', this.state.topHeaderTree)}
        <div className='horizontal-wrapper'>
          <div className="emptyBlock">empty</div>
          <TopHeader
            headerTree={this.state.topHeaderTree}
            openBtnClick={this.openBtnClick}
          />
        </div>

        <div className="head__content-wrapper">
          {/* <LeftHeader
            lNodes={this.props.lNodes}
            headerValues={this.props.headerValues}
            setupLeftHeaderList={this.setupLeftHeaderList}
          /> */}

          {/* <Field horizontalNodes={this.state.horizontalNodes}
            verticalNodes={this.state.verticalNodes} /> */}
        </div>

      </div>
    )
  }
}

DataTable.propTypes = {
  topHeaderTree: PropTypes.arrayOf(PropTypes.object)
}

export default DataTable;