import React, { useState, useEffect } from 'react';
import '../../sass/MeasureSelection.sass';
import ModalPortal from '../modal/ModalPortal';
import IndicatorSelectionBox from '../modal/IndicatorSelectionBox';
import DimensionSelectionField from './DimensionSelectionField';


const DimensionSelection = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [modalAbbr, setModalAbbr] = useState(null);

  const [dimensionValues, setDimensionValues] = useState({});
  const [chosenDimensionValues, setDimensionChosenValues] = useState({});


  useEffect(() => {
    const setupDimensionValues = () => {
      console.log('setupDimensionValues');

      let values = {};
      let chosenValues = {};

      let requests = props.dimensions.map(dimension => {
        return (

          fetch(`http://localhost:8080/dim?abbr=${dimension.Abbr}`)
            .then(response => response.json())
            .then(json => {
              values = { ...values, [dimension.Abbr]: json };

              let value = json[0] ? json[0] : null;
              chosenValues = { ...chosenValues, [dimension.Abbr]: [value] };
            })

        )
      });

      Promise.all(requests)
        .then(() => {
          setDimensionValues(values);
          setDimensionChosenValues(chosenValues);
        });
    }

    setupDimensionValues();

    //on mounting
  }, [props.dimensions])



  const onOpenModal = (abbr) => {
    setModalAbbr(abbr);
    setShowModal(true);
  }


  const onModalAcceptClick = (values) => {
    setDimensionChosenValues({ ...chosenDimensionValues, [modalAbbr]: values });
    setModalAbbr(null);
    setShowModal(false);
  }


  const onModalCancelClick = () => {
    setModalAbbr(null);
    setShowModal(false);
  }


  const onApplyClick = (singleValues, leftHeader, topHeader) => {
    props.onApplyClick(singleValues, leftHeader, topHeader, chosenDimensionValues);
  }

  return (
    <>
      <DimensionSelectionField
        dimensions={props.dimensions}
        onOpenModal={onOpenModal}
        dimensionValues={chosenDimensionValues}
        onApplyClick={onApplyClick}
      />


      {showModal && <ModalPortal>
        <IndicatorSelectionBox
          tree={dimensionValues[modalAbbr]}
          onCancelClick={onModalCancelClick}
          onAcceptClick={onModalAcceptClick}
          dimensionValues={chosenDimensionValues[modalAbbr]}
        />
      </ModalPortal>}
    </>
  )
}

export default DimensionSelection;

