import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const Dimension = React.memo(function Dimension(props) {

  const getValuesString = () => {
    if (props.dimensionValue) {
      return props.dimensionValue.map(value => value ? value.ID : '')
    } else {
      return '';
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
            {props.dimension.RName}  {props.dimensionValue
              && getValuesString().join(' ')}
            {/* { && props.dimensionValue.map(value => value ? `${value.ID} ` : '')} */}
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


export default Dimension;