import React, { PureComponent } from "react";
// import '../../sass/HeadCell.sass';
import OpenBtn from "./OpenBtn";
import PropTypes from 'prop-types';

class HeadCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      node: props.node, //не нужен
      isOpened: props.isOpened,
      wasClosed: false,
      isEndNode: !this.props.isOpened && !this.props.tNodes[this.props.index],
      isLevelEndNode: !this.props.isOpened && this.props.tNodes[this.props.index],
    }

    this.openClickHandler = this.openClickHandler.bind(this);
  }

  openClickHandler() {
    this.setState(prevState => {
      return {
        isOpened: !prevState.isOpened,
        wasClosed: prevState.isOpened ? true : false,

        isEndNode: prevState.isOpened && !this.props.tNodes[this.props.index],
        isLevelEndNode: prevState.isOpened && this.props.tNodes[this.props.index],
      }
    })

    this.props.openBtnClick(this.props.history, this.state.node.ID, this.state.node.Children);
    //на открытие/закрытие отправлять history и id или что-то другое в datatable
  }

  // pushNode = (node) => {
  //   this.props.pushNode(node);
  // }

  componentDidUpdate() {

    // if (!this.state.isOpened) { //this.state.isVertical || 
    //   this.pushNode(this.state.node.text); 
    // }

    if (this.props.isVertical) {
      this.props.resizeEmptyBlock();
    }

  }

  componentDidMount() {
    // if (!this.state.isOpened) { //this.state.isVertical || 
    //   this.pushNode(this.state.node.text); 
    // }

    // if (!this.props.isVertical &&
    //   !this.state.isOpened) {


    if (this.state.isEndNode) {
      //если компонент является конечным во всем заголовке
      let history = JSON.parse(JSON.stringify(this.props.history));
      history.endNodes.push(this.state.node.ID);
      this.props.pushNode(history);
    }

    if (this.state.isLevelEndNode) {
      //если компонент является конечным только на своём уровне
    }

    if (this.props.isVertical) {
      this.props.resizeEmptyBlock();
    }

  }

  generateNodeClass() {
    const nodeClass = ["node"];
    if (this.props.isSubnode) nodeClass.push("node__subnode");
    if (this.props.isSubnode && this.props.isVertical) nodeClass.push("node__subnode--vertical");
    if (!this.props.isSubnode && this.props.isVertical) nodeClass.push("node--vertical");

    if (!this.props.isVertical &&
      this.state.isEndNode) {

      nodeClass.push("cell-width");
    }

    if (this.props.isVertical &&
      this.state.isEndNode) {

      nodeClass.push("cell-height");
    }


    return nodeClass;
  }


  generateClass(sourceClass) {
    const resultClass = [sourceClass];
    if (this.props.isVertical) {
      resultClass.push(`${sourceClass}--vertical`);
    } else {
      resultClass.push(`${sourceClass}--horizontal`);
    }
    return resultClass;
  }


  getNewHistory(id) {
    let history = {};
    history.nodePath = [...this.props.history.nodePath, id];

    let endNodes = this.props.history.endNodes.slice();
    if (this.state.isLevelEndNode) {
      endNodes[this.props.index - 1] = this.state.node.ID;
    }
    history.endNodes = endNodes;

    // history.endNodes = this.state.isLevelEndNode ?
    //   [...this.props.history.endNodes, this.state.node.ID] : [...this.props.history.endNodes];

    return history;
  }


  render() {
    const openSign = this.state.isOpened ? "-" : "+";

    const nodeClass = this.generateNodeClass();
    const wrapperClass = this.generateClass("node__wrapper");
    const node_container = this.generateClass("node__container");

    const hasChildren = this.state.node.Children && this.state.node.Children.length > 0;


    return (
      <div
        className={nodeClass.join(' ')}
        data-cell={this.state.node.text}
      >
        <div
          className={node_container.join(' ')}
          title={this.state.node.Name}
        >

          {hasChildren &&
            <OpenBtn
              openSign={openSign}
              openClickHandler={this.openClickHandler}
            />}

          {console.log('render head cell')}
          <p className="node__text">
            {this.state.node.ID} {this.state.node.Name}
          </p>
        </div>


        {/* {console.log('this.props.index', this.props.index + ' ' + this.state.node.Name)} */}

        {this.state.isOpened && hasChildren &&
          <div className={wrapperClass.join(' ')}>

            {this.state.node.Children.map(n =>

              <HeadCell
                key={n.ID}
                node={n}
                isSubnode={true}
                isOpened={false}
                isVertical={this.props.isVertical}
                pushNode={this.props.pushNode}
                history={this.getNewHistory(n.ID)}
                index={this.props.index}
                tNodes={this.props.tNodes}
                headerValues={this.props.headerValues}
                openBtnClick={this.props.openBtnClick}
                resizeEmptyBlock={this.props.resizeEmptyBlock}
              />)

            }
          </div>
        }

        {(!this.state.isOpened || !hasChildren) &&
          this.props.tNodes[this.props.index] &&
          <div className={wrapperClass.join(' ')}>

            {this.props.headerValues[this.props.tNodes[this.props.index].Abbr].map(value =>

              <HeadCell
                key={value.ID}
                node={value}
                isSubnode={false}
                isOpened={false}
                isVertical={this.props.isVertical}
                history={this.getNewHistory(value.ID)}
                index={this.props.index + 1}
                tNodes={this.props.tNodes}
                headerValues={this.props.headerValues}
                pushNode={this.props.pushNode}
                openBtnClick={this.props.openBtnClick}
                resizeEmptyBlock={this.props.resizeEmptyBlock}
              />)}
          </div>

        }

      </div>
    )
  }

}

HeadCell.propTypes = {
  node: PropTypes.object,
  isSubnode: PropTypes.bool,
  isOpened: PropTypes.bool,
  isVertical: PropTypes.bool,
  history: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.number)),
  index: PropTypes.number,
  tNodes: PropTypes.arrayOf(PropTypes.object),
  headerValues: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  pushNode: PropTypes.func,
  openBtnClick: PropTypes.func,
  resizeEmptyBlock: PropTypes.func
}

export default HeadCell;