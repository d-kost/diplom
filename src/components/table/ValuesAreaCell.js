import React from "react";
import PropTypes from 'prop-types';

const ValuesAreaCell = (props) => {


  return (
    <div className="field__cell cell-width cell-height">
      {console.log('ValuesAreaCell render')}
      {props.value}
    </div>
  )

}

ValuesAreaCell.propTypes = {
  value: PropTypes.number
}

export default React.memo(ValuesAreaCell);
