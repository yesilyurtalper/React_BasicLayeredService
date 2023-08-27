import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import EventForm from "../../components/events/EventForm";

function UpdateEvent() {
  const { event } = useRouteLoaderData("eventdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected event...</p>}
    >
      <Await resolve={event}>
        {(event) => <EventForm method="PUT" event={event} />}
      </Await>
    </Suspense>
  );
}

export default UpdateEvent;
