import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
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
        <Button onClick={closeHandler} variant='contained'>Close</Button>
      </dialog>
    </>
  );
}

export default Modal;
