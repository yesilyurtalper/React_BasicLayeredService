import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import EventForm from "../../components/events/EventForm";

function CopyEvent() {
  const { data } = useRouteLoaderData("eventdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected event...</p>}
    >
      <Await resolve={data}>
        {(event) => <EventForm method="POST" event={event} />}
      </Await>
    </Suspense>
  );
}

export default CopyEvent;
