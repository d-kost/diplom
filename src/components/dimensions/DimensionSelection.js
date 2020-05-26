import React, { useState, useEffect } from 'react';
import '../../sass/DimensionSelection.sass';
import ModalPortal from '../modal/ModalPortal';
import DimensionSelectionField from './DimensionSelectionField';
import ModalWrapper from '../modal/ModalWrapper';
import { getDimensionValuesQuery } from '../../js_modules/queryHelper';
import * as timeData from '../../js_modules/timeData';
import { getChosenTimeObject } from '../../js_modules/timeObjectBuilder';
import PropTypes from 'prop-types';


const DimensionSelection = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [modalAbbr, setModalAbbr] = useState(null);

  const [dimensionValues, setDimensionValues] = useState({});
  const [chosenDimensionValues, setDimensionChosenValues] = useState({});

  const [chosenTimeValue, setChosenTimeValue] = useState(timeData.initialTime);


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


  const onModalAcceptClick = (values) => {
    //set chosenTimeValue
    if (modalAbbr === 'T') {
      setChosenTimeValue(values);
    } else {
      setDimensionChosenValues({ ...chosenDimensionValues, [modalAbbr]: values });
    }
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
    //добавить время в chosen в правильном виде
    //chosenDimensionValues[T] = [{...}];
    let timeObject = getChosenTimeObject(chosenTimeValue);
    let values = {
      ...chosenDimensionValues,
      'T': timeObject
    }
    //надо ли обновлять chosenDimensionValues ?

    if (leftHeader.length !== 0 && topHeader.length !== 0) {
      props.onApplyClick(singleValues, leftHeader, topHeader, values);
    }
    
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

DimensionSelection.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.object),
  onApplyClick: PropTypes.func
}

export default DimensionSelection;

