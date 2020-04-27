import { useEffect } from 'react';
import ReactDOM from 'react-dom';


const ModalPortal = (props) => {

  const elem = document.createElement('div');
  elem.className = 'modal';

  useEffect(() => {
    document.body.appendChild(elem);

    return () => {
      document.body.removeChild(elem);
    }

  });

  return ReactDOM.createPortal(props.children, elem);
    
}

export default ModalPortal;