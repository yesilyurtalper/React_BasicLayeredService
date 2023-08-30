
import { useLoaderData, useNavigate} from "react-router-dom";
import Event from "../../components/events/Event";
import classes from "./EventList.module.css";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function EventList() {
  const events = useLoaderData();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main className={classes.events}>
      <Button variant="contained" onClick={() => navigate("create")}>New Event</Button>
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
  );
}
