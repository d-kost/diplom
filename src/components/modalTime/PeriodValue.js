import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import getPreferredPeriodDisplay from '../../js_modules/preferredPeriodDisplay';

const PeriodValue = (props) => {


  const getSelectItems = useMemo(() => {
    let result = [];

    for (let i = props.from; i <= props.to; i++) {
      result.push(i);
    }

    return result;
  }, [props.from, props.to]);


  const preferredPeriodDisplay = useMemo(() => {
    let result = {};

    getSelectItems.forEach(item => {
      result[item] = getPreferredPeriodDisplay(props.name, item);
    });

    return result;
  }, [getSelectItems, props.name]);


  const getValidValue = () => {
    if (props.value > props.to) {
      return props.to;
    }
    if (props.value < props.from) {
      return props.from;
    }
    return props.value;
  }


  return (

    <div className='time-limit__item'>
      {console.log('PeriodValue render')}
      <p className='time-limit__name'>{props.name} </p>

      <select
        className='period-select'
        value={getValidValue()}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {getSelectItems.map(item => {
          let itemView = preferredPeriodDisplay[item];
          return (
            <option key={item} value={item} className='period-select__option'>

              {itemView}

            </option>
          )
        })}
      </select>

    </div>
  )
}

PeriodValue.propTypes = {
  name: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
}

export default PeriodValue;