import { useNavigation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { Button } from "@mui/material";
import classes from "./Events.module.css"

export default function Events(props) {
  const auth = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  console.log(navigation.state);

  return (
    <main className={classes.events}>
      <Button variant="contained" onClick={() => navigate("new")}>New Event</Button>
      <Outlet/>
    </main>
  );
}
