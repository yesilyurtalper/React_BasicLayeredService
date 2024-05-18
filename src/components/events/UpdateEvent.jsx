import { useRouteLoaderData,useActionData} from "react-router-dom";

import EventForm from "./EventForm";

function UpdateEvent() {

  const  event = useRouteLoaderData("eventdetails");
  return (
    <EventForm method="put" event={event.data} />
  );
}

export default UpdateEvent;
