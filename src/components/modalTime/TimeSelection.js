import React from 'react';
import * as timeData from '../../js_modules/timeData';
import TimeLimitsSelection from './TimeLimitsSelection';
import '../../sass/ModalTime.sass';
import PropTypes from 'prop-types';

const TimeSelection = (props) => {

  const onChangePeriod = (id) => {
    let newTime = {
      ...props.chosenTimeValue,
      periodId: id,
      chosenPeriodFrom: timeData.periodValue[id].min,
      chosenPeriodTo: timeData.periodValue[id].max
    };

    props.changeChosenTime(newTime);
  }

  const onChangeCheckbox = (id, checked) => {
    let checkbox = props.chosenTimeValue.checkboxVals.slice();
    if (checked) {
      checkbox.push(id);
    } else {
      let index = checkbox.indexOf(id);
      checkbox.splice(index, 1);
    }


    let newTime = { ...props.chosenTimeValue, checkboxVals: checkbox }
    props.changeChosenTime(newTime);

  }


  const changeYearFrom = (value) => {
    value = parseInt(value);
    let yearTo = props.chosenTimeValue.yearTo;

    let newTime = {
      ...props.chosenTimeValue,
      yearFrom: value,
      yearTo: value > yearTo ? value : yearTo
    }
    props.changeChosenTime(newTime);
  }


  const changeYearTo = (value) => {
    value = parseInt(value);
    let yearFrom = props.chosenTimeValue.yearFrom;

    let newTime = {
      ...props.chosenTimeValue,
      yearTo: value,
      yearFrom: value < yearFrom ? value : yearFrom
    }
    props.changeChosenTime(newTime);
  }


  const changeChosenPeriodFrom = (value) => {
    value = parseInt(value);
    let chosenPeriodTo = props.chosenTimeValue.chosenPeriodTo;

    let newTime = {
      ...props.chosenTimeValue,
      chosenPeriodFrom: value,
      chosenPeriodTo: value > chosenPeriodTo ? value : chosenPeriodTo
    }
    props.changeChosenTime(newTime);
  }


  const changeChosenPeriodTo = (value) => {
    value = parseInt(value);
    let chosenPeriodFrom = props.chosenTimeValue.chosenPeriodFrom;

    let newTime = {
      ...props.chosenTimeValue,
      chosenPeriodTo: value,
      chosenPeriodFrom: value < chosenPeriodFrom ? value : chosenPeriodFrom
    }
    props.changeChosenTime(newTime);
  }


  return (
    <div className='modal-time'>
      <div className='modal-time__wrapper'>
        <div className='period-group'>

          {timeData.periodList.map(period => {
            return (
              <p key={period.ID} className='period-group__item'>
                <input
                  name='period'
                  type='radio'
                  value={period.ID}
                  defaultChecked={period.ID === props.chosenTimeValue.periodId ? true : false}
                  onChange={() => onChangePeriod(period.ID)}
                />

                {period.Name}
              </p>
            )
          })}


        </div>

        <div className='period-group'>

          {timeData.periodList.map(period => {
            return (
              <p key={period.ID} className='period-group__item'>
                <input
                  name='period'
                  type='checkbox'
                  value={period.ID}
                  tabIndex={0}
                  defaultChecked={props.chosenTimeValue.checkboxVals.includes(period.ID)}
                  disabled={period.ID < props.chosenTimeValue.periodId ? true : false}
                  onClick={(e) => onChangeCheckbox(period.ID, e.target.checked)} />

                {period.Name}
              </p>
            )
          })}

        </div>

        <TimeLimitsSelection
          chosenTimeValue={props.chosenTimeValue}
          changeYearFrom={changeYearFrom}
          changeYearTo={changeYearTo}
          changeChosenPeriodFrom={changeChosenPeriodFrom}
          changeChosenPeriodTo={changeChosenPeriodTo}
        />
      </div >
    </div>
  )
}

TimeSelection.propTypes = {
  chosenTimeValue: PropTypes.object,
  changeChosenTime: PropTypes.func
}

export default TimeSelection;