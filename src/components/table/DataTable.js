import React, { Component } from 'react';
// import testData from '../test-data.json';
// import testDataH from '../../json/horizontal.json';
// import testDataV from '../../json/vertical.json';
import '../../sass/Table.sass';
import TopHeader from './TopHeader';
// import LeftHeader from './LeftHeader';
// import Field from './Field';
import PropTypes from 'prop-types';

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // tNodes: testDataH,
      // v_nodes: testDataV,
      horizontalNodes: [],
      verticalNodes: []
    }

    this.addNodeToHorizontalNodes = this.addNodeToHorizontalNodes.bind(this);
    this.addNodeToVerticalNodes = this.addNodeToVerticalNodes.bind(this);

  }

  commonAddNodes(nodeList, newNode, wasClosed) {
    //wasClosed - при клике "закрыть" на родителя
    //потомки узла скрываются, вместо них записывается родитель
    let newState = nodeList;
    if (wasClosed) {
      for (let i = 0; i < newState.length; i++) {
        let node = newState[i];

        if (node.indexOf(newNode) === 0) {
          let indexOfNewNode = newState.indexOf(newNode);

          if (indexOfNewNode === -1) {
            newState[i] = newNode; //rewrite child by parent node

          } else {
            newState.splice(i, 1); //delete child
            i--;
          }
        }
      }
    } else {
      let flag = false; //для didMount
      //при постоянном false узел добавится в окнец списка, как абсолютно новый
      //у которого еще не было в списке ни родителей, ни потомков
      //то есть при первой отрисовке узлов
      let parentId = newNode.replace(/([.]*)-\d*$/, "");
      for (let i = 0; i < newState.length; i++) {
        let node = newState[i];

        if (node.indexOf(parentId) === 0) {
          flag = true;

          if (node === parentId) {
            newState[i] = newNode;
          } else {
            newState.splice(i + 1, 0, newNode)
          }
          break;
        }
      }
      if (!flag) {
        newState.push(newNode);
      }
    }
    return newState;
  }


  addNodeToHorizontalNodes(newNode, wasClosed) {
    let newState = this.commonAddNodes(this.state.horizontalNodes, newNode, wasClosed);
    this.setState({
      horizontalNodes: newState
    })
    //оптимизировать
    //если использовать простой цикл fori, то можно прервать обход   
  }

  addNodeToVerticalNodes(newNode, wasClosed) {
    let newState = this.commonAddNodes(this.state.verticalNodes, newNode, wasClosed);
    this.setState({
      verticalNodes: newState
    })
  }


  render() {
    return (
      <div className="head">

        <div className='horizontal-wrapper'>
          <div className="emptyBlock">empty</div>
          <TopHeader
            tNodes={this.props.tNodes}
            headerValues={this.props.headerValues}
            addNodeToHorizontalNodes={this.addNodeToHorizontalNodes}
          />
        </div>


        {/* <div className='horizontal-wrapper'>
          <div className="emptyBlock">empty</div>
          <HorizontalTitle
            tNodes={this.state.h_nodes}
            addNodeToHorizontalNodes={this.addNodeToHorizontalNodes} 
          />
        </div>


        <div className="head__content-wrapper">
          <LeftHeader v_nodes={this.state.v_nodes}
            addNodeToVerticalNodes={this.addNodeToVerticalNodes}
          />

          <Field horizontalNodes={this.state.horizontalNodes}
            verticalNodes={this.state.verticalNodes} />
        </div> */}


        {/* {console.log("h", this.state.horizontalNodes)}
                {console.log("v", this.state.verticalNodes)} */}
      </div>


    )
  }

}

DataTable.propTypes = {
  tNodes: PropTypes.arrayOf(PropTypes.object),
  lNodes: PropTypes.arrayOf(PropTypes.object),
  headerValues: PropTypes.object
}

export default DataTable;