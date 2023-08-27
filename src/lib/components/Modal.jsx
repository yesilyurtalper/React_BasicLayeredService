
import classes from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

function Modal(props) {
  const navigate = useNavigate();
  
  return (
    <>
      <div className={classes.backdrop} onClick={()=> navigate("..")} />
      <dialog open className={classes.overlay}>
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
