import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import Event from "../../components/events/Event";
import classes from "./EventList.module.css";

export default function EventList() {
  const {data} = useLoaderData();
  
  return (
    
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading current events...</p>
        }
      >
        <Await resolve={data}>
          {(events) => (
            <main>
              {events.length > 0 && (
                <ul className={classes.list}>
                  {events.map((event) => (
                    <Event
                      key={event.id}
                      id={event.id}
                      author={event.author}
                      title={event.title}
                      body={event.body}
                    />
                  ))}
                </ul>
              )}
              {events.length === 0 && (
                <div style={{ textAlign: "center", color: "white" }}>
                  <h2>There are no events yet.</h2>
                  <p>Start adding some!</p>
                </div>
              )}
            </main>
          )}
        </Await>
      </Suspense>
  );
}
