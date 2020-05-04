import React, { Component } from 'react';
import HeadCell from './HeadCell';
import PropTypes from 'prop-types';

export default class LeftHeader extends Component {
  constructor(props) {
    super(props);

    this.resizeEmptyBlock = this.resizeEmptyBlock.bind(this);
  }

  resizeEmptyBlock() {
    // ref?????        
    let verticalWidth = document.querySelector('.head__vertical').clientWidth;
    let emptyBlock = document.querySelector('.emptyBlock');

    if (verticalWidth !== emptyBlock.clientWidth) {
      emptyBlock.style.minWidth = verticalWidth + 'px';
    }
  }

  componentDidMount() {
    // this.resizeEmptyBlock();
  }

  render() {
    return (
      <div className="head__vertical">
        {console.log('this.props.lNodes', this.props.lNodes)}

        {this.props.lNodes[0] &&
          this.props.headerValues[this.props.lNodes[0].Abbr].map(value =>
            <HeadCell
              key={value.ID}
              node={value}
              isSubnode={false}
              isOpened={true}
              isVertical={true}
              index={1}
              tNodes={this.props.lNodes}
              headerValues={this.props.headerValues}
              pushNode={this.props.setupLeftHeaderList}
              resizeEmptyBlock={this.resizeEmptyBlock}
            />
          )}
        {/* {this.props.lNodes.map(n => <HeadCell
          key={n.id}
          node={n}
          isSubnode={false}
          isOpened={true}
          isVertical={true}
          index={1}
          tNodes={this.props.lNodes}
          headerValues={this.props.headerValues}
          pushNode={this.props.addNodeToVerticalNodes}
          resizeEmptyBlock={this.resizeEmptyBlock}
        />)} */}
      </div>
    )
  }
}

LeftHeader.propTypes = {
  lNodes: PropTypes.arrayOf(PropTypes.object),
  setupLeftHeaderList: PropTypes.func
}