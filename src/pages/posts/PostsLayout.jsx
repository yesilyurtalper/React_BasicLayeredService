import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { Button } from "@mui/material";
import classes from "./PostsLayout.module.css"

export default function PostsLayout(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main className={classes.posts}>
      <Button variant="contained" onClick={() => navigate("create")}>New Post</Button>
      <Outlet/>
    </main>
  );
}
