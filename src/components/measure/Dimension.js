import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const Dimension = React.memo(function Dimension(props) {

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="selection-list__dimension"
        >
          {/* {console.log('render li', props.id)} */}
          <p className='selection-list__title'>{props.name}</p>
          <button
            onClick={() => props.onOpenModal(props.id)}
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