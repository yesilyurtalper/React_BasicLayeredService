
import classes from './CustomModal.module.css';
import { useNavigate } from 'react-router-dom';
import { Modal} from '@mui/material';

function CustomModal(props) {
  const navigate = useNavigate();
  
  return (
    <Modal open onClose={()=> navigate("..")}>
      <dialog open className={classes.overlay}>
        {props.children}
      </dialog>
    </Modal>
  );
}

export default CustomModal;
