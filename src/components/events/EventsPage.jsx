
import QueryEvents from "./QueryEvents";
import EventsGrid from "./EventsGrid";
import withOutlet from "../HOCs/withOutlet";

const EventsPage = () => {
  return (
    <>
      <QueryEvents/>
      <EventsGrid/>
    </>
  );
}

const EventsWithOutlet = withOutlet(EventsPage);

export default EventsWithOutlet;
