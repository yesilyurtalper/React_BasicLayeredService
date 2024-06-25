import { useRouteLoaderData, useActionData } from "react-router-dom";
import { TextField } from "@mui/material";
import CustomModal from "../common/CustomModal";
import classes from "./EventDetails.module.css";
import Error from "../common/Error";
import DetailsActions from "../common/actions/DetailsActions";
import { getDateUpToMinute } from "../../utility/dateConversion";

export default function EventDetails() {
  const loaderResult = useRouteLoaderData("eventdetails");
  const actionResult = useActionData();
  const event = loaderResult.data;
  console.log(actionResult);

  return (
    <CustomModal>
      <main className={classes.details}>
        <DetailsActions manipulate entity="events" />
        <Error result={actionResult} />

        {!loaderResult.isSuccess && <Error result={loaderResult} /> }
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
              value={getDateUpToMinute(event.date)}
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
    </CustomModal>
  );
}
