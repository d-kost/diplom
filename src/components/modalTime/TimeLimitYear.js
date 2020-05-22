import React from 'react';
import PropTypes from 'prop-types';

const TimeLimitYear = (props) => {

  return (

    <div className='time-limit__item'>
      {console.log('TimeLimitYear render')}
      <p className='time-limit__name'>{props.name} </p>
      <input type='number'
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>

  )
}

TimeLimitYear.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
}



export default TimeLimitYear;