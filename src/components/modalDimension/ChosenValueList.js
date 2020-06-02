import React from 'react';
import PropTypes from 'prop-types';


const ChosenValueList = (props) => {
  return (
    <ul className='modal-list'>

      {props.values.map(value => {
        return (
          <li key={value.ID} className='modal-list__item'>
            <p className='modal-list__name'>{value.ID} {value.Name}</p>
            <span
              className='modal-list__delete-btn'
              onClick={() => props.onDeleteClick(value.ID)}
              tabIndex={0}
              role='img'
              aria-label='delete'
            >
              &#10060;
            </span>
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
