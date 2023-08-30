import { Link } from "react-router-dom";
import classes from "./Event.module.css";

function Event({ id, author, title, body }) {
  return (
    <Link to={`id/${id}`} className={classes.event}>
      <li >
        <p className={classes.author}>by {author}</p>
        <p className={classes.title}>{title}</p>
        <p className={classes.body}>{body}</p>
      </li>
    </Link>
  );
}

export default Event;
