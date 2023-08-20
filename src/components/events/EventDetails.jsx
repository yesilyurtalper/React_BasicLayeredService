import { useLoaderData, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./EventDetails.module.css";

export default function EventDetails() {
  const event = useLoaderData();

  console.log(event);

  if (!event) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find event</h1>
          <p>Unfortunately, the requested event could not be found.</p>
          <p>
            <Link to=".." relative="path" className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        <TextField
          label="Event Id"
          value={event.id}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Author"
          value={event.author}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Title"
          value={event.title}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Body"
          value={event.description}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          multiline
          maxRows={5}
        />
        <TextField
          label="Date"
          value={event.dateCreated}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          type="datetime"
        />
      </main>
    </Modal>
  );
}
