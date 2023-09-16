import { useRouteLoaderData } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../components/Modal";
import classes from "./EventDetails.module.css";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import DetailsActions from "../../components/DetailsActions";

export default function EventDetails() {
  const loaderResult = useRouteLoaderData("eventdetails");
  const event = loaderResult.data;

  return (
    <Modal>
      <main className={classes.details}>
        <DetailsActions manipulate item="events" />
        {!loaderResult.isSuccess && <ActionLoaderResult result={loaderResult} /> }
        {loaderResult.isSuccess && 
          <section>
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
          </section>
        }
      </main>
    </Modal>
  );
}
