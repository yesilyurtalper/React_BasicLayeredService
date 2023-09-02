import {
  useActionData,
  useNavigation,
  useRouteError,
  Link,
} from "react-router-dom";
import Event from "./Event";
import classes from "./EventsTable.module.css";
import ActionResult from "../../components/ActionResult";
import { CircularProgress } from "@mui/material";

export default function EventsTable() {
  const result = useActionData();
  const error = useRouteError();
  const navigation = useNavigation();
  const loading = navigation.state != "idle";

  if (loading) return <CircularProgress />;

  if (error) return <p>{error.message}</p>;

  if (!result) return;

  if (!result.isSuccess) return <ActionResult />;

  const events = result.data;

  if (!Array.isArray(events) || events.length < 1)
    return <p>No events found!</p>;

  return (
    <main>
      <ul className={classes.list}>
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            author={event.author}
            title={event.title}
            body={event.body}
          />
        ))}
      </ul>
    </main>
  );
}
