import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';


const Dimension = React.memo((props) => {

  const getValuesString = () => {
    if (props.dimensionValue) {
      return props.dimensionValue.map(value => value ? value.ID : '')
    } else {
      return [];
    }
  }


  return (
    <Draggable draggableId={props.dimension.id.toString()} index={props.index}>

      {provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="selection-list__dimension"
        >

          {/* {console.log('render li', props.dimensionValue)} */}

          <p
            className='selection-list__title'
            title={getValuesString()}
          >
            {props.dimension.RName}  {getValuesString().join(' ')}
          </p>

          <button
            onClick={() => props.onOpenModal(props.dimension.Abbr)}
            className='selection-list__button'
          >
            Open
          </button>

        </li>
      )}

    </Draggable>

  )
});


Dimension.propTypes = {
  dimension: PropTypes.shape({
    id: PropTypes.number,
    RName: PropTypes.string,
    Abbr: PropTypes.string,
  }),
  index: PropTypes.number,
  onOpenModal: PropTypes.func,
  dimensionValue: PropTypes.arrayOf(PropTypes.object)
}

export default Dimension;