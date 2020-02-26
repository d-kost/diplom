import React, { PureComponent } from "react";

export default class FieldCell extends PureComponent {

    render() {
        return(
            <div className="field__cell cell-width cell-height"
            data-cell-col={this.props.hNode} data-cell-row={this.props.vNode}>
                {this.props.vNode + " " + this.props.hNode}</div>
            
        )
    }
}