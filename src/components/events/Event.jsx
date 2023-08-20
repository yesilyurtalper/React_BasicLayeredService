import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import classes from "./Event.module.css";

function Event({ id, title, body }) {
  return (
    <li className={classes.event}>
      <Link to={`${id}`}>
        <p className={classes.title}>{title}</p>
        <p className={classes.body}>{body}</p>
      </Link>
    </li>
  );
}

export default Event;
