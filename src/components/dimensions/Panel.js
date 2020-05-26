import React from 'react';
import PropTypes from 'prop-types';
import Dimension from './Dimension';
import { Droppable } from 'react-beautiful-dnd';


const Panel = (props) => {

  return (
    <div className="measure-selection__panel">

      <div className="measure-selection__title">
        {props.data.name}
      </div>

      <Droppable droppableId={props.data.id}>
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
                  dimension={dim}
                  index={index}
                  onOpenModal={props.onOpenModal}
                  dimensionValue={props.dimensionValues[dim.Abbr]}
                >
                </Dimension>
              ))}

              {props.data.id !== '1' &&
                props.dimensions.length === 0 &&
                <p>Заголовок должен иметь хотя бы одно выбранное измерение</p>
              }

              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>

    </div>
  )
}


Panel.propTypes = {
  data: PropTypes.object,
  onOpenModal: PropTypes.func,
  dimensionValues: PropTypes.objectOf(PropTypes.array),
  dimensions: PropTypes.arrayOf(PropTypes.object)
}

export default Panel;