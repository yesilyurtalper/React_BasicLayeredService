import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { Button } from "@mui/material";
import classes from "./EventsLayout.module.css"

export default function EventsLayout(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main className={classes.events}>
      <Button variant="contained" onClick={() => navigate("create")}>New Event</Button>
      <Outlet/>
    </main>
  );
}
