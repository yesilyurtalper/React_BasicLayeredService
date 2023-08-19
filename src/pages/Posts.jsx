import { useNavigation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { Button } from "@mui/material";
import classes from "./Posts.module.css"

export default function Posts(props) {
  const auth = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  console.log(navigation.state);

  return (
    <main className={classes.posts}>
      <Button variant="contained" onClick={() => navigate("new")}>New Post</Button>
      <Outlet/>
    </main>
  );
}
