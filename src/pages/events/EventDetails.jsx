import { useRouteLoaderData} from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./EventDetails.module.css";
import ActionResult from "../../lib/components/ActionResult";
import Actions from "../../lib/components/Actions";

export default function EventDetails() {
  const event = useRouteLoaderData("eventdetails");

  return (
    <Modal>
      <main className={classes.details}>
        {!event && (
          <>
            <h1>Could not find event</h1>
            <p>Unfortunately, the requested event could not be found.</p>
          </>
        )}
        {event && (
          <>
            <ActionResult />

            <TextField
              label="Event Id"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={event.id}
            />

            <TextField
              label="Author"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={event.author}
            />

            <TextField
              label="Title"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={event.title}
            />

            <TextField
              label="Body"
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={3}
              variant="standard"
              value={event.body}
            />

            <TextField
              label="Created Date"
              InputProps={{
                readOnly: true,
              }}
              type="datetime"
              variant="standard"
              value={event.dateCreated}
            />

            <TextField
              label="Updated Date"
              InputProps={{
                readOnly: true,
              }}
              type="datetime"
              variant="standard"
              value={event.dateModified}
            />

            <Actions />
          </>
        )}
      </main>
    </Modal>
  );
}
