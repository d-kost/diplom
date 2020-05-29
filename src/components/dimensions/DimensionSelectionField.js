import React, { useEffect } from 'react';
import Panel from './Panel';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { panelsData } from '../../js_modules/dimensionPanelsInfo';
import PropTypes from 'prop-types';


const DimensionSelectionField = React.memo((props) => {

  const [dimensions, setDimensions] = useState([]);
  const [leftHeaderDimensions, setLeftHeaderDimensions] = useState([]);
  const [topHeaderDimensions, setTopHeaderDimensions] = useState([]);


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
      case panelsData.common.id: return [dimensions.slice(), setDimensions];

      case panelsData.left.id: return [leftHeaderDimensions.slice(), setLeftHeaderDimensions];

      case panelsData.top.id: return [topHeaderDimensions.slice(), setTopHeaderDimensions];
      default: return [null, null];
    }
  }


  const getPreferredDimensionsNames = () => {
    let names = [];

    for (const key in props.preferredDimensions) {
      if (props.preferredDimensions.hasOwnProperty(key)) {
        const element = props.preferredDimensions[key];
        names.push(element.RName);
      }
    }

    return names;
  }


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="measure-selection">

          <Panel
            data={panelsData.common}
            dimensions={dimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>


          <Panel
            data={panelsData.left}
            dimensions={leftHeaderDimensions}
            onOpenModal={props.onOpenModal}
            dimensionValues={props.dimensionValues}
          >
          </Panel>

          <Panel
            data={panelsData.top}
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
          onClick={() => props.onApplyClick(leftHeaderDimensions, 
            topHeaderDimensions)}
        >
          Apply
      </button>

        {getPreferredDimensionsNames().map((name, i) => {
          return (
            <div key={i}>{name}</div>
          )
        })}
      </div>

    </>
  )
})

DimensionSelectionField.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.object),
  onOpenModal: PropTypes.func,
  dimensionValues: PropTypes.objectOf(PropTypes.array),
  onApplyClick: PropTypes.func,
  preferredDimensions: PropTypes.objectOf(PropTypes.object)
}

export default DimensionSelectionField;

