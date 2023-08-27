import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import EventForm from "../../components/events/EventForm";

function CopyEvent() {
  const { event } = useRouteLoaderData("eventdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected event...</p>}
    >
      <Await resolve={event}>
        {(event) => <EventForm method="POST" event={event} />}
      </Await>
    </Suspense>
  );
}

export default CopyEvent;
