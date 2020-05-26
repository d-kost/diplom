import React, { Component } from 'react';
import HeaderCell from './HeaderCell';
import PropTypes from 'prop-types';

export default class LeftHeader extends Component {


  render() {
    return (
      // <div className="data-table__left-header">
      <>
        {/* {console.log('render LeftHeader', this.props.headerTree)} */}

        {this.props.headerTree[0] &&
          this.props.headerTree.map(node =>

            <HeaderCell
              key={node.ID}
              node={node}
              isVertical={true}
              headerTree={this.props.headerTree}
              openBtnClick={this.props.openBtnClick}
              resizeEmptyBlock={this.props.resizeEmptyBlock}
            />

          )}
      </>
      /* </div> */
    )
  }
}

LeftHeader.propTypes = {
  headerTree: PropTypes.arrayOf(PropTypes.object),
  openBtnClick: PropTypes.func
}