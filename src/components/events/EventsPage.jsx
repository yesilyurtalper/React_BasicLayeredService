
import classes from "./EventsPage.module.css";
import QueryEvents from "./QueryEvents";
import EventsTable from "./EventsTable";
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
