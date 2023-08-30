import { useRouteLoaderData} from "react-router-dom";

import EventForm from "../../components/events/EventForm";

function UpdateEvent() {

  const  event = useRouteLoaderData("eventdetails");

  return (
    <EventForm method="PUT" event={event} />
  );
}

export default UpdateEvent;
