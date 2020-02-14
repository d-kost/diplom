import React, { Component } from "react";

class OpenBtn extends Component{
    render() {
        return(
            <div className="node__open-btn"
            onClick={this.props.openClickHandler}>{this.props.openSign}</div>
        )
    }
}

export default OpenBtn;