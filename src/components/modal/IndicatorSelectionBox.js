import React, { useState } from 'react';
import '../../sass/Modal.sass';
import IndicatorsTreeHolder from './IndicatorsTreeHolder';
import ChosenIndicatorField from './ChosenIndicatorField';

const IndicatorSelectionBox = (props) => {

  const [chosenIndicatorList, setChosenIndicatorList] = useState(props.dimensionValues);


  const onIndicatorDownClick = (node) => {
    
    if (!chosenIndicatorList.includes(node)) {
      let newList = [...chosenIndicatorList, node];   
      setChosenIndicatorList(newList);
    }
  }


  const onIndicatorDeleteClick = (id) => {
    let newList = chosenIndicatorList.filter(indicator => indicator.ID !== id);
    setChosenIndicatorList(newList);
  }


  return (
    <div className="modal-window">

      <IndicatorsTreeHolder
        tree={props.tree}
        onNodeDownClick={onIndicatorDownClick}
      />

      <div className="modal-panel">
        <span
          className='modal-window__button-down'
        >
        </span>
      </div>

      <ChosenIndicatorField
        indicators={chosenIndicatorList}
        onDeleteClick={onIndicatorDeleteClick}
      />

      <div className="">
        <button
          className='modal-window__button'
          onClick={props.onCancelClick}
        >
          Cancel
        </button>

        <button
          className='modal-window__button'
          onClick={() => props.onAcceptClick(chosenIndicatorList)}
        >
          Accept
        </button>
      </div>



    </div>
  )
}

export default IndicatorSelectionBox;