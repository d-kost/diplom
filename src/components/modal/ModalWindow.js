import React from 'react';

const ModalWindow = (props) => {

  return (
    <div className="modal-window">

      {props.children}


      <div className="modal-window__bottom-panel">
        <button
          className='modal-window__button'
          onClick={props.onCancelClick}
        >
          Cancel
            </button>

        <button
          className='modal-window__button'
          onClick={() => props.onAcceptClick()}
        >
          Accept
            </button>
      </div>
    </div>
  )
}

export default ModalWindow;

