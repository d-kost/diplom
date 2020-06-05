import React, { PureComponent } from "react";
import '../../sass/HeaderCell.sass';
import OpenBtn from "./OpenBtn";
import PropTypes from 'prop-types';
import getPreferredPeriodDisplay from '../../js_modules/preferredPeriodDisplay';

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
    let nodeClass = [];
    const isEnding = !this.props.node.isOpened && !this.props.node.nextLevel;

    if (!isEnding) {
      nodeClass.push(...this.generateClass("node"));
    } else {
      nodeClass.push('node');
    }
    nodeClass.push(this.props.isVertical ? 'node--border-bottom' : 'node--border-right');

    if (!this.props.isVertical && isEnding) {
      nodeClass.push("cell-width");
    }

    if (this.props.isVertical && isEnding) {
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


  generateNodeTextClass() {
    let textClass = ['node__text'];

    let needsLimit = (this.props.node.Children && this.props.node.Children.length === 1) ||
      (this.props.node.nextLevel && this.props.node.nextLevel.length === 1);

    if (needsLimit && this.props.isVertical) {
      textClass.push('limit-height');
    }

    return textClass;

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


  getNameToDisplay() {
    if (this.props.node.Abbr === 'T') {
      let [number, name] = this.props.node.Name.split(' ');    
      let title = getPreferredPeriodDisplay(name, number);
      if (this.props.node.year) {
        title += ' ' + this.props.node.year;
      }
      return title;
    }
    return this.props.node.Name;
  }


  render() {
    const openSign = this.props.node.isOpened ? "-" : "+";

    const nodeClass = this.generateNodeClass();
    const wrapperClass = this.generateClass("node__wrapper");
    const node_container = this.generateClass("node__container");

    const nodeTextClass = this.generateNodeTextClass();

    const hasChildren = this.props.node.Children && this.props.node.Children.length > 0;


    return (
      <div className={nodeClass.join(' ')}>
        <div
          className={node_container.join(' ')}
          title={this.props.node.Name}
        >

          {hasChildren &&
            <OpenBtn
              openSign={openSign}
              openClickHandler={this.openClickHandler}
            />}

          {/* {console.log('render head cell')} */}
          <p className={nodeTextClass.join(' ')}>
            {this.getNameToDisplay()}
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