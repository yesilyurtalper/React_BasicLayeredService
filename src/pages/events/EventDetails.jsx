import { useRouteLoaderData, useActionData } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../components/Modal";
import classes from "./EventDetails.module.css";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import DetailsActions from "../../components/DetailsActions";

export default function EventDetails() {
  const loaderResult = useRouteLoaderData("eventdetails");
  const actionResult = useActionData();
  const event = loaderResult.data;

  return (
    <Modal>
      <main className={classes.details}>
        <DetailsActions manipulate item="events" />
        <ActionLoaderResult result={actionResult} />

        {!loaderResult.isSuccess && <ActionLoaderResult result={loaderResult} /> }
        {loaderResult.isSuccess && 
          <section className={classes.content}>
            <TextField
              label="Event Id"
              readOnly
              variant="standard"
              value={event.id}
            />

            <TextField
              label="Organizer"
              readOnly
              variant="standard"
              value={event.author}
            />

            <TextField
              label="Title"
              readOnly
              variant="standard"
              value={event.title}
            />

            <TextField
              label="Body"
              readOnly
              multiline
              rows={3}
              variant="standard"
              value={event.body}
            />

            <TextField
              label="Event Date"
              readOnly
              variant="standard"
              value={event.date}
            />

            <TextField
              label="Ticket Price"
              readOnly
              variant="standard"
              value={event.price}
            />

            <TextField
              label="Capacity"
              readOnly
              variant="standard"
              value={event.capacity}
            />

            <TextField
              label="Created Date"
              readOnly
              variant="standard"
              value={event.dateCreated}
            />

            <TextField
              label="Updated Date"
              readOnly
              variant="standard"
              value={event.dateModified}
            />
          </section>
        }
      </main>
    </Modal>
  );
}
