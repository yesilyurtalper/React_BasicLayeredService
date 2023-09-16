
import classes from "./EventsPage.module.css";
import QueryEvents from "../../components/events/QueryEvents";
import EventsTable from "../../components/events/EventsTable";

export default function EventsPage() {
  return (
    <main className={classes.events}>
      <QueryEvents/>
      <EventsTable/>
    </main>
  );
}
