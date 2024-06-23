import { Link } from "react-router-dom";
import classes from "./Post.module.css";

export default function Post({ id, author, title, body }) {
  return (
    <Link to={`id/${id}`} className={classes.post}>
      <div >
        <p className={classes.author}>by {author}</p>
        <p className={classes.title}>{title}</p>
        <p className={classes.body}>{body}</p>
      </div>
    </Link>
  );
}
