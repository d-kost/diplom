import React, { useState, useCallback } from 'react';
import ValuesSelectionBox from '../modalDimension/ValuesSelectionBox';
import ModalWindow from './ModalWindow';
import TimeSelection from '../modalTime/TimeSelection';
import '../../sass/Modal.sass';
import PropTypes from 'prop-types';


const ModalWrapper = (props) => {

  const [chosenValueList, setChosenValueList] = useState(props.dimensionValues);
  const [chosenTime, setChosenTime] = useState(props.chosenTimeValue);

  const onValueDownClick = (node) => {
    if (!chosenValueList.includes(node)) {
      let newList = [...chosenValueList, node];
      setChosenValueList(newList);
    }
  }


  const onValueDeleteClick = (id) => {
    let newList = chosenValueList.filter(indicator => indicator.ID !== id);
    setChosenValueList(newList);
  }

  const changeChosenTime = useCallback((newTime) => {
    setChosenTime(newTime);
  }, []);


  const onAcceptClick = () => {
    if (props.modalAbbr === 'T') {
      props.onAcceptClick(chosenTime);

    } else if (chosenValueList.length === 0) {
      props.onAcceptClick([props.tree[0]]);

    } else {
      props.onAcceptClick(chosenValueList);
    }
  }


  return (
    <ModalWindow
      onAcceptClick={onAcceptClick}
      onCancelClick={props.onCancelClick}
    >

      {props.modalAbbr === 'T' ?
        <TimeSelection
          chosenTimeValue={chosenTime}
          changeChosenTime={changeChosenTime}
        />
        :
        <ValuesSelectionBox
          tree={props.tree}
          onNodeDownClick={onValueDownClick}
          onDeleteClick={onValueDeleteClick}
          chosenValueList={chosenValueList}
        />
      }

    </ModalWindow>
  )
}

ModalWrapper.propTypes = {
  onCancelClick: PropTypes.func,
  onAcceptClick: PropTypes.func,
  modalAbbr: PropTypes.string,
  tree: PropTypes.arrayOf(PropTypes.object),
  dimensionValues: PropTypes.arrayOf(PropTypes.object),
  chosenTimeValue: PropTypes.object
}

export default ModalWrapper;

