import React from 'react';
import '../../sass/modal.sass';
import DimensionsTreeHolder from './DimensionsTreeHolder';

const SelectionBox = (props) => {
  return (
    <div className="modal-window">
      
      <DimensionsTreeHolder tree={props.tree} />

      <div className="modal-panel">
        <button className='modal-window__button'>move</button>
      </div>

      <div className="modal-list">

      </div>


      <div className="">
        <button
          className='modal-window__button'
          onClick={props.onCancelClick}
        >
          Cancel
        </button>

        <button className='modal-window__button'>Accept</button>
      </div>
      


    </div>
  )
}

export default SelectionBox;