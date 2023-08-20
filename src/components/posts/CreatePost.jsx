import { Link, Form, useNavigate } from "react-router-dom";
import classes from "./PostDetails.module.css";
import Modal from "../../lib/components/Modal";
import { useAuth } from "react-oidc-context";
import { Button, TextField } from "@mui/material";

export default function CreatePost() {
  const auth = useAuth();
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..',{relative:"path"});
  }

  return (
    <Modal>
      <Form method="post" className={classes.details}>

        <TextField
          label="Author"
          required
          value={auth.user.profile.name}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

        <TextField
          label="Title"
          required
          InputProps={{
            readOnly: false,
          }}
          variant="standard"
        />
        <TextField
          label="Body"
          required
          InputProps={{
            readOnly: false,
          }}
          variant="standard"
          multiline
          rows={5}
        />

        <p className={classes.actions}>
          <Button onClick={closeHandler} variant='contained'>Cancel</Button>
          <Button variant="contained">Submit</Button>
        </p>
      </Form>
    </Modal>
  );
}
