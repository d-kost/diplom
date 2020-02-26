import React, { PureComponent } from "react";

class OpenBtn extends PureComponent{
    render() {
        return(
            <div className="node__open-btn"
            onClick={this.props.openClickHandler}>{this.props.openSign}</div>
        )
    }
}

export default OpenBtn;