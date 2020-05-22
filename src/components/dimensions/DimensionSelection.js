import React, { useState, useEffect } from 'react';
import '../../sass/DimensionSelection.sass';
import ModalPortal from '../modal/ModalPortal';
import DimensionSelectionField from './DimensionSelectionField';
import ModalWrapper from '../modal/ModalWrapper';
import { getDimensionValuesQuery } from '../../js_modules/queryHelper';
import { initialTime } from '../../js_modules/timeData';


const DimensionSelection = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [modalAbbr, setModalAbbr] = useState(null);

  const [dimensionValues, setDimensionValues] = useState({});
  const [chosenDimensionValues, setDimensionChosenValues] = useState({});

  const [chosenTimeValue, setChosenTimeValue] = useState(initialTime);


  useEffect(() => {
    const setupDimensionValues = () => {
      console.log('setupDimensionValues');

      let values = {};
      let chosenValues = {};

      let requests = props.dimensions.map(dimension => {
        return (

          fetch(getDimensionValuesQuery(dimension.Abbr))
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


  const onModalAcceptClick = (values, chosenTime) => {
    //set chosenTimeValue
    setDimensionChosenValues({ ...chosenDimensionValues, [modalAbbr]: values });
    closeModal();
  }


  const onModalCancelClick = () => {
    closeModal();
  }


  const closeModal = () => {
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
        <ModalWrapper
          onCancelClick={onModalCancelClick}
          onAcceptClick={onModalAcceptClick}
          modalAbbr={modalAbbr}
          tree={dimensionValues[modalAbbr]}
          dimensionValues={chosenDimensionValues[modalAbbr]}
          chosenTimeValue={chosenTimeValue}
        />
      </ModalPortal>}

    </>
  )
}

export default DimensionSelection;

