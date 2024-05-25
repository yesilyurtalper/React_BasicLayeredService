import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import classes from "./PostsLayout.module.css"

export default function PostsLayout(props) {
  const navigate = useNavigate();

  return (
    <main className={classes.posts}>
      <Button variant="contained" onClick={() => navigate("create")}>New Post</Button>
      <Outlet/>
    </main>
  );
}
