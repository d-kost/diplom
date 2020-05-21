import React, { useState } from 'react';
import ValuesSelectionBox from './ValuesSelectionBox';
import ModalWindow from '../modal/ModalWindow';

const ModalWrapper = (props) => {

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


  const onAcceptClick = () => {
    props.onAcceptClick(chosenIndicatorList);
  }


  return (
    <ModalWindow
      onAcceptClick={onAcceptClick}
      onCancelClick={props.onCancelClick}
    >
      <ValuesSelectionBox
        tree={props.tree}
        dimensionValues={props.dimensionValues}
        onNodeDownClick={onIndicatorDownClick}
        onDeleteClick={onIndicatorDeleteClick}
        chosenIndicatorList={chosenIndicatorList}
      />
    </ModalWindow>
  )
}

export default ModalWrapper;

