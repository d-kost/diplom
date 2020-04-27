import React, { Component } from 'react';
import HeadCell from './HeadCell';
import PropTypes from 'prop-types';

export default class HorizontalTitle extends Component {
    
  render() {
        
    return(
      <div className="head__horizontal">
        {/* <div className="emptyBlock">empty</div> */}
        {/* <div className="horizontal-wrapper"> */}
          {this.props.h_nodes.map(n => <HeadCell
            key={n.id} node={n} isSubnode={false} isOpened={true}
            isVertical={false} pushNode={this.props.addNodeToHorizontalNodes}
          />)}
        {/* </div> */}
        
        </div>
    )
  }
}

HorizontalTitle.propTypes = {
    h_nodes: PropTypes.arrayOf(PropTypes.object),
    addNodeToHorizontalNodes: PropTypes.func
};
