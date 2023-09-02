
import { useNavigate} from "react-router-dom";
import classes from "./EventsPage.module.css";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import QueryEvents from "../../components/events/QueryEvents";
import EventsTable from "../../components/events/EventsTable";

export default function EventsPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main className={classes.events}>
      <QueryEvents/>
      <EventsTable/>
    </main>
  );
}
