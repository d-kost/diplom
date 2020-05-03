import React from "react";
import PropTypes from 'prop-types';

const OpenBtn = (props) => {

  return (
    <div className="node__open-btn"
      onClick={props.openClickHandler}>{props.openSign}</div>
  )

}

OpenBtn.propTypes = {
  openSign: PropTypes.string,
  openClickHandler: PropTypes.func
}

export default React.memo(OpenBtn);