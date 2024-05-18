import { useRouteLoaderData} from "react-router-dom";

import EventForm from "./EventForm";

function CopyEvent() {

  const event = useRouteLoaderData("eventdetails");

  return (
    <EventForm method="post" event={event.data} />
  );
}

export default CopyEvent;
