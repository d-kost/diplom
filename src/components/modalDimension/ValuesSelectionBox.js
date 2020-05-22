import React from 'react';
import ValuesTreeHolder from './ValuesTreeHolder';
import ChosenValueList from './ChosenValueList';
import PropTypes from 'prop-types';

const ValuesSelectionBox = (props) => {

  return (
    <>
      <ValuesTreeHolder
        tree={props.tree}
        onNodeDownClick={props.onNodeDownClick}
      />

      <ChosenValueList
        values={props.chosenValueList}
        onDeleteClick={props.onDeleteClick}
      />
    </>

  )
}

ValuesSelectionBox.propTypes = {
  tree: PropTypes.arrayOf(PropTypes.object),
  onNodeDownClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  chosenValueList: PropTypes.arrayOf(PropTypes.object)
}

export default ValuesSelectionBox;