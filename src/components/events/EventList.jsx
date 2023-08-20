import { useLoaderData} from "react-router-dom";
import Event from "./Event";
import classes from "./Event.module.css";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EventList(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const events = useLoaderData();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main>
      {events.length > 0 && (
        <ul className={classes.list}>
          {events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              body={event.description}
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
  );
}
