import React from 'react';
import Panel from './Panel';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';


const DimensionSelectionField = React.memo(function DimensionSelectionField(props) {

  const [dimensions, setDimensions] = useState(props.dimensions);
  const [leftTitleDimensions, setLeftTitleDimensions] = useState([]);
  const [topTitleDimensions, setTopTitleDimensions] = useState([]);

  const titleIds = {
    common: '1',
    left: '2',
    top: '3'
  }


  const onDragEnd = result => {

    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }


    let [startList, updateStartList] = getListById(source.droppableId);

    if (source.droppableId === destination.droppableId) {
      let draggableElement = startList[source.index];

      startList.splice(source.index, 1);
      startList.splice(destination.index, 0, draggableElement);

      updateStartList(startList);
      return;
    }

    let draggableElement = startList[source.index];
    startList.splice(source.index, 1);

    let [endList, updateEndList] = getListById(destination.droppableId);
    endList.splice(destination.index, 0, draggableElement);

    updateStartList(startList);
    updateEndList(endList);

  }


  const getListById = (id) => {
    switch (id) {
      case titleIds.common: return [dimensions.slice(), setDimensions];

      case titleIds.left: return [leftTitleDimensions.slice(), setLeftTitleDimensions];

      case titleIds.top: return [topTitleDimensions.slice(), setTopTitleDimensions];
      default: return [null, null];
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="measure-selection">

          <Panel
            id={titleIds.common}
            type='single'
            dimensions={dimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>


          <Panel
            id={titleIds.left}
            type='left'
            dimensions={leftTitleDimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>

          <Panel
            id={titleIds.top}
            type='top'
            dimensions={topTitleDimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>

        </div>

      </DragDropContext>

      <button
        onClick={() => props.onApplyClick(dimensions,
          leftTitleDimensions, topTitleDimensions)}
      >
        Apply
      </button>
    </>
  )
})

export default DimensionSelectionField;

