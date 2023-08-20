import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..',{relative:"path"});
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.overlay}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
