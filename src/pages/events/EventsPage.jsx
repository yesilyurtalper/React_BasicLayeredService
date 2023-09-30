
import classes from "./EventsPage.module.css";
import QueryEvents from "../../components/events/QueryEvents";
import EventsTable from "../../components/events/EventsTable";
import { useRef } from "react";

export default function EventsPage() {

  const formRef = useRef();

  return (
    <section className={classes.events} method="post" ref={formRef}>
      <QueryEvents/>
      <EventsTable formRef={formRef}/>
    </section>
  );
}
