import React, { useState } from 'react';
import '../../sass/Modal.sass';
import ValuesTreeHolder from './ValuesTreeHolder';
import ChosenValueList from './ChosenValueList';

const ValuesSelectionBox = (props) => {

  // const [chosenIndicatorList, setChosenIndicatorList] = useState(props.dimensionValues);


  // const onIndicatorDownClick = (node) => {

  //   if (!chosenIndicatorList.includes(node)) {
  //     let newList = [...chosenIndicatorList, node];
  //     setChosenIndicatorList(newList);
  //   }
  // }


  // const onIndicatorDeleteClick = (id) => {
  //   let newList = chosenIndicatorList.filter(indicator => indicator.ID !== id);
  //   setChosenIndicatorList(newList);
  // }


  return (
    // <div className="modal-window">

    <>
      <ValuesTreeHolder
        tree={props.tree}
        onNodeDownClick={props.onNodeDownClick}
      />

      <ChosenValueList
        indicators={props.chosenIndicatorList}
        onDeleteClick={props.onDeleteClick}
      />
    </>

    //   <div className="modal-window__">
    //     <button
    //       className='modal-window__button'
    //       onClick={props.onCancelClick}
    //     >
    //       Cancel
    //     </button>

    //     <button
    //       className='modal-window__button'
    //       onClick={() => props.onAcceptClick(chosenIndicatorList)}
    //     >
    //       Accept
    //     </button>
    //   </div>



    // </div> 
  )
}

export default ValuesSelectionBox;