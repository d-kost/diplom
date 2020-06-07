import React from 'react';
import PropTypes from 'prop-types';


const ChosenValueList = (props) => {
  return (
    <ul className='modal-list'>

      {props.values.map(value => {
        return (
          <li key={value.ID} className='modal-list__item'>
            <p className='modal-list__name'>{value.ID} {value.Name}</p>
            <button
              className='modal-list__delete-btn tree-button'
              onClick={() => props.onDeleteClick(value.ID)}
            >
              &#128473;
            </button>
          </li>
        )
      })}

    </ul>
  )
}

ChosenValueList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  onDeleteClick: PropTypes.func
}

export default ChosenValueList;
