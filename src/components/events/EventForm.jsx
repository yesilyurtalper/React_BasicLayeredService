import { Form } from "react-router-dom";
import classes from "../../pages/events/EventDetails.module.css";
import Modal from "../../lib/components/Modal";
import { useAuth } from "react-oidc-context";
import {TextField } from "@mui/material";
import ActionErrors from "../../lib/components/ActionErrors";
import Actions from "../../lib/components/Actions";

export default function EventForm({ method, event }) {
  const auth = useAuth();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <ActionErrors />

        <TextField
          label="Event Id"
          name="Id"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          defaultValue={method === "PUT" ? event.id : 0}
          style={method === "PUT" ? undefined : { display: "none" }}
        />

        <TextField
          label="Author"
          name="Author"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          defaultValue={auth.user.profile.preferred_username}
        />

        <TextField
          label="Title"
          name="Title"
          required
          InputProps={{
            readOnly: false,
          }}
          variant="standard"
          defaultValue={event ? event.title : ""}
        />

        <TextField
          label="Body"
          name="Body"
          required
          InputProps={{
            readOnly: false,
          }}
          multiline
          rows={5}
          variant="standard"
          defaultValue={event ? event.body : ""}
        />

        <Actions small/>
      </Form>
    </Modal>
  );
}
