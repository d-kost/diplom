import React from 'react';
import * as timeData from '../../js_modules/timeData';
import TimeLimitYear from './TimeLimitYear';
import PropTypes from 'prop-types';
import PeriodValue from './PeriodValue';

const TimeLimitsSelection = (props) => {

  const yearName = timeData.getPeriodById(0).Name;
  const periodValue = timeData.periodValue[props.chosenTimeValue.periodId];

  return (
    <>
      <p>С</p>
      <div className='time-limit'>

        <TimeLimitYear
          name={yearName}
          min={timeData.periodValue[0].min}
          max={timeData.periodValue[0].max}
          value={props.chosenTimeValue.yearFrom}
          onChange={props.changeYearFrom}
        />

        {props.chosenTimeValue.periodId !== 0 &&
          <PeriodValue
            name={timeData.getPeriodById(props.chosenTimeValue.periodId).Name}
            from={periodValue.min}
            to={periodValue.max}
            value={props.chosenTimeValue.chosenPeriodFrom}
            onChange={props.changeChosenPeriodFrom}
          />}

      </div>


      <p>По</p>
      <div className='time-limit'>


        <TimeLimitYear
          name={yearName}
          min={timeData.periodValue[0].min}
          max={timeData.periodValue[0].max}
          value={props.chosenTimeValue.yearTo}
          onChange={props.changeYearTo}
        />

        {props.chosenTimeValue.periodId !== 0 &&
          <PeriodValue
            name={timeData.getPeriodById(props.chosenTimeValue.periodId).Name}
            from={periodValue.min}
            to={periodValue.max}
            value={props.chosenTimeValue.chosenPeriodTo}
            onChange={props.changeChosenPeriodTo}
          />}

      </div>
    </>
  )
}

TimeLimitsSelection.propTypes = {
  chosenTimeValue: PropTypes.object,
  changeYearFrom: PropTypes.func,
  changeYearTo: PropTypes.func,
  changeChosenPeriodFrom: PropTypes.func,
  changeChosenPeriodTo: PropTypes.func
}

export default TimeLimitsSelection;

