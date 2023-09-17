import { useRouteLoaderData} from "react-router-dom";

import EventForm from "../../components/events/EventForm";

function UpdateEvent() {

  const  event = useRouteLoaderData("eventdetails");

  return (
    <EventForm method="put" event={event.data} />
  );
}

export default UpdateEvent;
