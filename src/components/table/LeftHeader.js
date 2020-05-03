import React, { Component } from 'react';
import HeadCell from './HeadCell';
import PropTypes from 'prop-types';

export default class LeftHeader extends Component {
  constructor(props) {
    super(props);

    this.resizeEmptyBlock = this.resizeEmptyBlock.bind(this);
  }

  resizeEmptyBlock() {
    // console.log("ADSGF");        
    let verticalWidth = document.querySelector('.head__vertical').clientWidth;
    let emptyBlock = document.querySelector('.emptyBlock');

    if (verticalWidth !== emptyBlock.clientWidth) {
      emptyBlock.style.minWidth = verticalWidth + 'px';
    }
  }

  componentDidMount() {
    this.resizeEmptyBlock();
  }

  render() {
    return (
      <div className="head__vertical">
        {this.props.v_nodes.map(n => <HeadCell
          key={n.id} node={n} isSubnode={false} isOpened={true}
          isVertical={true} pushNode={this.props.addNodeToVerticalNodes}
          resizeEmptyBlock={this.resizeEmptyBlock}
        />)}
      </div>
    )
  }
}

LeftHeader.propTypes = {
  v_nodes: PropTypes.arrayOf(PropTypes.object),
  addNodeToVerticalNodes: PropTypes.func
}