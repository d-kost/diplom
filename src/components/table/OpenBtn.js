import React, { PureComponent } from "react"
import PropTypes from 'prop-types'

class OpenBtn extends PureComponent{
    render() {
        return(
            <div className="node__open-btn"
            onClick={this.props.openClickHandler}>{this.props.openSign}</div>
        )
    }
}

OpenBtn.propTypes = {
    openSign: PropTypes.string,
    openClickHandler: PropTypes.func
}

export default OpenBtn;