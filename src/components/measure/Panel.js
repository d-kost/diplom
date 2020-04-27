import React from 'react';
import PropTypes from 'prop-types';
import Dimension from './Dimension';
import { Droppable } from 'react-beautiful-dnd';


const Panel = (props) => {

    return (
        <div className="measure-selection__panel">

          <div className="measure-selection__title">
              {props.type}
          </div>
          
          <Droppable droppableId={props.id}>
            {provided => (
              <div className="selection-list">
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="selection-list__ul"
                >
         
                  {props.dimensions.map((dim, index) => (
                    <Dimension
                      key={dim.id}
                      id={dim.id}
                      name={dim.RName}
                      index={index}
                      onOpenModal={props.onOpenModal}                      
                    >
                    </Dimension>
                  ))}

                  {provided.placeholder}
                </ul>
              </div>
            )}
            </Droppable>

        </div>
    )
}


Panel.propTypes = {
    dimensions: PropTypes.array
}

export default Panel;