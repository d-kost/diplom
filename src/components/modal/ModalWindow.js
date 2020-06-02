import React from 'react';
import PropTypes from 'prop-types';

const ModalWindow = (props) => {

  return (
    <div className="modal-window">

      {props.children}

      <div className="modal-window__bottom-panel">
        <button
          className='modal-window__button common-button'
          onClick={props.onCancelClick}
        >
          Cancel
        </button>

        <button
          className='modal-window__button common-button'
          onClick={() => props.onAcceptClick()}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

ModalWindow.propTypes = {
  onAcceptClick: PropTypes.func,
  onCancelClick: PropTypes.func,
}

export default ModalWindow;

