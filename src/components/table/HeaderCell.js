import React, { PureComponent } from "react";
import '../../sass/HeadCell.sass';
import OpenBtn from "./OpenBtn";
import PropTypes from 'prop-types';

class HeaderCell extends PureComponent {
  constructor(props) {
    super(props);

    this.openClickHandler = this.openClickHandler.bind(this);
  }

  openClickHandler() {
    this.props.openBtnClick(this.props.node, this.props.isVertical);
  }


  componentDidUpdate() {
    if (this.props.isVertical) {
      this.props.resizeEmptyBlock();
    }
  }

  componentDidMount() {
    if (this.props.isVertical) {
      this.props.resizeEmptyBlock();
    }
  }


  generateNodeClass() {
    const nodeClass = [];
    nodeClass.push(...this.generateClass("node"));

    if (!this.props.isVertical &&
      !this.props.node.isOpened &&
      !this.props.node.nextLevel) {

      nodeClass.push("cell-width");
    }

    if (this.props.isVertical &&
      !this.props.node.isOpened &&
      !this.props.node.nextLevel) {

      nodeClass.push("cell-height");
    }


    return nodeClass;
  }


  generateClass(sourceClass) {
    const resultClass = [sourceClass];
    if (this.props.isVertical) {
      resultClass.push(`${sourceClass}--left`);
    } else {
      resultClass.push(`${sourceClass}--top`);
    }
    return resultClass;
  }


  getHeaderCellComponent(subnode) {
    return (
      <HeaderCell
        key={subnode.ID}
        node={subnode}
        isVertical={this.props.isVertical}
        headerTree={this.props.headerTree}
        openBtnClick={this.props.openBtnClick}
        resizeEmptyBlock={this.props.resizeEmptyBlock}
      />
    )
  }


  render() {
    const openSign = this.props.node.isOpened ? "-" : "+";

    const nodeClass = this.generateNodeClass();
    const wrapperClass = this.generateClass("node__wrapper");
    const node_container = this.generateClass("node__container");

    const hasChildren = this.props.node.Children && this.props.node.Children.length > 0;


    return (
      <div
        className={nodeClass.join(' ')}
      >
        <div
          className={node_container.join(' ')}
          title={this.props.node.Name}
        >

          {hasChildren &&
            <OpenBtn
              openSign={openSign}
              openClickHandler={this.openClickHandler}
            />}

          {console.log('render head cell')}
          <p className="node__text">
            {this.props.node.ID} {this.props.node.Name}
          </p>
        </div>


        {this.props.node.isOpened && this.props.node.Children &&
          <div className={wrapperClass.join(' ')}>

            {this.props.node.Children.map(subnode => this.getHeaderCellComponent(subnode, true))}
          </div>
        }

        {!this.props.node.isOpened && this.props.node.nextLevel &&
          <div className={wrapperClass.join(' ')}>

            {this.props.node.nextLevel.map(subnode => this.getHeaderCellComponent(subnode, false))}

          </div>
        }
      </div>
    )
  }

}

HeaderCell.propTypes = {
  node: PropTypes.object,
  isVertical: PropTypes.bool,
  openBtnClick: PropTypes.func,
  resizeEmptyBlock: PropTypes.func //only for vertical
}

export default HeaderCell;