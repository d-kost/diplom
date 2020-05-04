import React, { PureComponent } from "react";
import '../../sass/HeadCell.sass';
import OpenBtn from "./OpenBtn";
import PropTypes from 'prop-types';

class HeadCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      node: props.node,
      isOpened: props.isOpened,
      wasClosed: false,
    }

    this.openClickHandler = this.openClickHandler.bind(this);
  }

  openClickHandler() {
    this.setState(prevState => {
      return {
        isOpened: !prevState.isOpened,
        wasClosed: prevState.isOpened ? true : false
      }
    })
  }

  pushNode = (node) => {
    this.props.pushNode(node);
  }

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

    if (!this.props.isVertical &&
      !this.state.isOpened) {

      if (!this.props.tNodes[this.props.index]) {
        //если компонент является конечным во всем заголовке
        this.props.pushNode(this.state.node);

      } else {
        //если компонент является конечным только на своём уровне
        this.prop.pushNode(this.state.node);
      }
    }



    // this.props.pushNode(this.state.node);


    // if (!this.props.isVertical &&
    //   !this.state.isOpened &&
    //   this.props.tNodes[this.props.index]) {
    //     //если компонент является конечным только на своём уровне
    //     this.pushNode(this.state.node);
    //     // this.props.pushNode(this.state.node);
    // }

    if (this.props.isVertical) {
      this.props.resizeEmptyBlock();
    }

  }

  generateNodeClass() {
    const nodeClass = ["node"];
    if (this.props.isSubnode) nodeClass.push("node__subnode");
    if (this.props.isSubnode && this.props.isVertical) nodeClass.push("node__subnode--vertical");
    if (!this.props.isSubnode && this.props.isVertical) nodeClass.push("node--vertical");

    // if (!this.state.isOpened && !this.props.isVertical) nodeClass.push("cell-width");
    // if (!this.state.isOpened && this.props.isVertical) nodeClass.push("cell-height");


    if (!this.props.isVertical &&
      !this.state.isOpened &&
      !this.props.tNodes[this.props.index]) {

      nodeClass.push("cell-width");
    }

    if (this.props.isVertical &&
      !this.state.isOpened &&
      !this.props.tNodes[this.props.index]) {

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
        <div className={node_container.join(' ')}>

          {hasChildren &&
            <OpenBtn
              openSign={openSign}
              openClickHandler={this.openClickHandler}
            />}

          {console.log('render head cell')}
          <p
            className="node__text"
            title={this.state.node.Name}
          >
            {this.state.node.Name}
          </p>
        </div>

        {/* <div className={wrapperClass.join(' ')}> */}

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
                index={this.props.index}
                tNodes={this.props.tNodes}
                headerValues={this.props.headerValues}
                resizeEmptyBlock={this.props.resizeEmptyBlock}
              />)}
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
                index={this.props.index + 1}
                tNodes={this.props.tNodes}
                headerValues={this.props.headerValues}
                pushNode={this.props.pushNode}
                resizeEmptyBlock={this.props.resizeEmptyBlock}
              />)}
          </div>

        }

      </div>
      // </div >
    )
  }

}

HeadCell.propTypes = {
  node: PropTypes.object,
  isSubnode: PropTypes.bool,
  isOpened: PropTypes.bool,
  isVertical: PropTypes.bool,
  index: PropTypes.number,
  tNodes: PropTypes.arrayOf(PropTypes.object),
  headerValues: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  pushNode: PropTypes.func,
  resizeEmptyBlock: PropTypes.func
}

export default HeadCell;