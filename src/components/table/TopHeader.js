import React, { PureComponent } from 'react';
import HeaderCell from './HeaderCell';
import PropTypes from 'prop-types';

export default class TopHeader extends PureComponent {

  render() {

    return (
      <div className="data-table__top-header">

        {/* {console.log('this.props.tNodes', this.props.tNodes)} */}

        {this.props.headerTree[0] &&
          this.props.headerTree.map(node =>

            <HeaderCell
              key={node.ID}
              node={node}
              isVertical={false}
              headerTree={this.props.headerTree}
              openBtnClick={this.props.openBtnClick}
            />

          )}
      </div>
    )
  }
}

TopHeader.propTypes = {
  headerTree: PropTypes.arrayOf(PropTypes.object),
  openBtnClick: PropTypes.func
};
