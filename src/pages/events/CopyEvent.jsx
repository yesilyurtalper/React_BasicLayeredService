import { useRouteLoaderData} from "react-router-dom";

import EventForm from "../../components/events/EventForm";

function CopyEvent() {

  const event = useRouteLoaderData("eventdetails");

  return (
    <EventForm method="post" event={event.data} />
  );
}

export default CopyEvent;
