import React, { Component } from 'react'
import HeadCell from './HeadCell'

export default class HorizontalTitle extends Component {
    
    render() {
        
        return(
        <div className="head__horizontal">
        <div className="emptyBlock"></div>
        {this.props.h_nodes.map(n => <HeadCell
            key={n.id} node={n} isSubnode={false} isOpened={true}
            isVertical={false} pushNode={this.props.addNodeToHorizontalNodes}/>)}
        </div>
        )
    }
}