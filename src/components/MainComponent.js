import React, { useEffect } from 'react';
// import Table from './table/Table';
import ModalPortal from './modal/ModalPortal';
import SelectionBox from './modal/SelectionBox';
import MeasureSelectionField from './measure/MeasureSelectionField';
import { useState } from 'react';


function MainComponent() {

  const [dimensions, setDimensions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTree, setModalTree] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/dims')
      .then(response => response.json())
      .then(json => setDimensions(json))
  }, [])

  const onOpenModal = (id) => {
    console.log(id);
    let dimension = dimensions.filter(dimension => dimension.id === id)[0];

    const query = `http://localhost:8080/dim?abbr=${dimension.Abbr}`;
    console.log(query);

    fetch(query)
      .then(response => response.json())
      .then(json => {
        setModalTree(json)
        setShowModal(true);
      })
      

  }

  const onModalCancelClick = () => {
    setShowModal(false);
  }

  return (
    <div>
      {dimensions.length && 
        <MeasureSelectionField
          dimensions={dimensions}
          onOpenModal={onOpenModal}
        />
      }

      {showModal && <ModalPortal>
          <SelectionBox
            tree={modalTree}
            onCancelClick={onModalCancelClick}
          />
      </ModalPortal>}
        
      {/* <Table/> */}
    </div>
  )
}

export default MainComponent;
