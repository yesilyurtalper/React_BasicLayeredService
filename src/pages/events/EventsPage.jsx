
import classes from "./EventsPage.module.css";
import QueryEvents from "../../components/events/QueryEvents";
import EventsTable from "../../components/events/EventsTable";
import { Form } from "react-router-dom";
import { useRef } from "react";

export default function EventsPage() {

  const formRef = useRef();

  return (
    <Form className={classes.events} method="post" ref={formRef}>
      <QueryEvents formRef={formRef}/>
      <EventsTable formRef={formRef}/>
    </Form>
  );
}
