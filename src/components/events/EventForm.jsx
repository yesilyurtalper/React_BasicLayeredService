import { Form, useActionData } from "react-router-dom";
import classes from "../../components/events/EventDetails.module.css";
import Modal from "../common/Modal";
import { useAuth } from "react-oidc-context";
import { TextField } from "@mui/material";
import SubmitCancelActions from "../common/actions/SubmitCancelActions";
import Error from "../common/Error";
import getCurrentDate, { getDateUpToMinute } from "../../utility/dateConversion";

export default function EventForm({ method, event }) {
  const auth = useAuth();
  const actionResult = useActionData();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <Error result={actionResult} />

        <TextField
          label="Event Id"
          name="Id"
          readOnly
          variant="standard"
          value={method === "put" ? event.id : 0}
          style={method === "put" ? undefined : { display: "none" }}
        />

        <TextField
          label="Author"
          name="Author"
          readOnly
          variant="standard"
          value={auth.user.profile.preferred_username}
        />

        <TextField
          label="Title"
          name="Title"
          required
          variant="standard"
          defaultValue={event ? event.title : ""}
        />

        <TextField
          label="Body"
          name="Body"
          required
          multiline
          rows={5}
          variant="standard"
          defaultValue={event ? event.body : ""}
        />

        <TextField
          label="Event Date"
          name="Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          defaultValue={event ? getDateUpToMinute(event.date) : getCurrentDate()}
        />

        <TextField
          label="Ticket Price"
          name="Price"
          type="number"
          inputProps={{ step: "0.01" }}
          variant="standard"
          defaultValue={event ? event.price : 0}
        />

        <TextField
          label="Capacity"
          name="Capacity"
          type="number"
          variant="standard"
          defaultValue={event ? event.capacity : 0}
        />

        <SubmitCancelActions item="events" method={method} />
      </Form>
    </Modal>
  );
}
