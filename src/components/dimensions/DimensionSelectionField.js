import React, { useEffect } from 'react';
import Panel from './Panel';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';


const DimensionSelectionField = React.memo(function DimensionSelectionField(props) {

  const [dimensions, setDimensions] = useState([]);
  const [leftHeaderDimensions, setLeftHeaderDimensions] = useState([]);
  const [topHeaderDimensions, setTopHeaderDimensions] = useState([]);

  const headerIds = {
    common: '1',
    left: '2',
    top: '3'
  }

  useEffect(() => {
    console.log('dimension selection field use effect');

    let newDimensions = props.dimensions.slice();
    let topHeaderDefaultElement = newDimensions.splice(0, 1); //get 1st element
    let leftHeaderDefaultElement = newDimensions.splice(1, 1); //get 3rd element

    setDimensions(newDimensions);
    setLeftHeaderDimensions(leftHeaderDefaultElement);
    setTopHeaderDimensions(topHeaderDefaultElement);

    //on mounting
  }, [props.dimensions])


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
      case headerIds.common: return [dimensions.slice(), setDimensions];

      case headerIds.left: return [leftHeaderDimensions.slice(), setLeftHeaderDimensions];

      case headerIds.top: return [topHeaderDimensions.slice(), setTopHeaderDimensions];
      default: return [null, null];
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="measure-selection">

          <Panel
            id={headerIds.common}
            type='single'
            dimensions={dimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>


          <Panel
            id={headerIds.left}
            type='left'
            dimensions={leftHeaderDimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>

          <Panel
            id={headerIds.top}
            type='top'
            dimensions={topHeaderDimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>

        </div>

      </DragDropContext>

      <div className='dimensions-apply'>
        <button
          className='dimensions-apply__button'
          onClick={() => props.onApplyClick(dimensions,
            leftHeaderDimensions, topHeaderDimensions)}
        >
          Apply
      </button>
      </div>

    </>
  )
})

export default DimensionSelectionField;

