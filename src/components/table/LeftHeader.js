import React, { Component } from 'react';
import HeaderCell from './HeaderCell';
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
        {console.log('render LeftHeader', this.props.headerTree)}

        {this.props.headerTree[0] &&
          this.props.headerTree.map(node =>

            <HeaderCell
              key={node.ID}
              node={node}
              isSubnode={false}
              isVertical={true}
              headerTree={this.props.headerTree}
              openBtnClick={this.props.openBtnClick}
              resizeEmptyBlock={this.resizeEmptyBlock}
            />

          )}
        
      </div>
    )
  }
}

LeftHeader.propTypes = {
  headerTree: PropTypes.arrayOf(PropTypes.object),
  openBtnClick: PropTypes.func
}