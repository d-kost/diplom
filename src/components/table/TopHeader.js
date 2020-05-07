import React, { PureComponent } from 'react';
import HeaderCell from './HeaderCell';
import PropTypes from 'prop-types';

export default class TopHeader extends PureComponent {

  render() {

    return (
      <div className="head__horizontal">

        {/* {console.log('this.props.tNodes', this.props.tNodes)} */}

        {this.props.headerTree[0] &&
          this.props.headerTree.map(node =>

            <HeaderCell
              key={node.ID}
              node={node}
              isSubnode={false}
              isVertical={false}
              headerTree={this.props.headerTree}
              openBtnClick={this.props.openBtnClick}
            />

          )}

        {/* {this.props.tNodes[0] &&
          this.props.headerValues[this.props.tNodes[0].Abbr].map(value =>

            <HeadCell
              key={value.ID}
              node={value}
              isSubnode={false}
              isOpened={true}
              isVertical={false}
              history={{
                nodePath: [value.ID],
                endNodes: []
              }}
              index={1}
              tNodes={this.props.tNodes}
              headerValues={this.props.headerValues}
              openBtnClick={this.props.openBtnClick}
              pushNode={this.pushNode}
            />

          )} */}
      </div>
    )
  }
}

TopHeader.propTypes = {
  headerTree: PropTypes.arrayOf(PropTypes.object),
  openBtnClick: PropTypes.func
};
