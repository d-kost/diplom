import React from 'react';
import PropTypes from 'prop-types';


const ChosenValueList = (props) => {
  return (
    <ul className='modal-list'>

      {props.values.map(value => {
        return (
          <li key={value.ID} className='modal-list__item'>
            <p className='modal-list__name'>{value.ID} {value.Name}</p>
            <div
              className='modal-list__delete-btn'
              onClick={() => props.onDeleteClick(value.ID)}
            >
              Delete
            </div>
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
