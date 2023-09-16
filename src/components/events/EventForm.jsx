import { Form, useActionData } from "react-router-dom";
import classes from "../../pages/events/EventDetails.module.css";
import Modal from "../Modal";
import { useAuth } from "react-oidc-context";
import { TextField } from "@mui/material";
import SubmitCancelActions from "../SubmitCancelActions";
import ActionLoaderResult from "../../components/ActionLoaderResult";

export default function EventForm({ method, event }) {
  const auth = useAuth();
  const actionResult = useActionData();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <ActionLoaderResult result={actionResult} />

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

        <SubmitCancelActions item="event" method={method} />
      </Form>
    </Modal>
  );
}
