import React from "react";
import PropTypes from 'prop-types';

const OpenBtn = (props) => {

  return (
    <button className="node__open-btn"
      onClick={props.openClickHandler}>{props.openSign}</button>
  )

}

OpenBtn.propTypes = {
  openSign: PropTypes.string,
  openClickHandler: PropTypes.func
}

export default React.memo(OpenBtn);