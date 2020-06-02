import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


const ModalPortal = (props) => {

  const elem = document.createElement('div');
  elem.setAttribute("role", "dialog");
  elem.setAttribute("aria-modal", "true");
  elem.className = 'modal';

  let tabbableList = useRef();


  const keyListener = (e) => {
    const tabbableListLength = tabbableList.current.length;
    if (tabbableListLength === 0) {
      return;
    }

    const firstElement = tabbableList.current[0];
    const lastElement = tabbableList.current[tabbableListLength - 1];

    //tab button
    if (e.keyCode === 9) {
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        return e.preventDefault();
      }
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }
    }
  }

  
  useEffect(() => {
    document.body.appendChild(elem);
    document.addEventListener("keydown", keyListener);

    //set focus to modal
    tabbableList.current = elem.querySelectorAll('button, [href], '
     + 'input, select, textarea, [tabindex]:not([tabindex="-1"])');
    tabbableList.current[0].focus();


    return () => {
      document.body.removeChild(elem);
    }

  }, [elem]);

  return ReactDOM.createPortal(props.children, elem);

}

export default ModalPortal;