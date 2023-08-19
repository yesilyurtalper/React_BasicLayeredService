import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import classes from "./Post.module.css";

function Post({ id, title, body }) {
  return (
    <li className={classes.post}>
      <Link to={`${id}`}>
        <p className={classes.title}>{title}</p>
        <p className={classes.body}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
