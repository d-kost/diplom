import React from 'react';


const ChosenIndicatorField = (props) => {
  return (
    <ul className='modal-list'>

      {props.indicators.map(indicator => {
        return (
          <li key={indicator.ID} className='modal-list__item'>
            <p className='modal-list__name'>{indicator.ID} {indicator.Name}</p>
            <div
              className='modal-list__delete-btn'
              onClick={() => props.onDeleteClick(indicator.ID)}
            >
              Delete
            </div>
          </li>
        )
      })}
      
    </ul>
  )
}

export default ChosenIndicatorField;
