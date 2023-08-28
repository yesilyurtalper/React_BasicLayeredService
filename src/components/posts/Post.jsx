import { Link } from "react-router-dom";
import classes from "./Post.module.css";

function Post({ id, author, title, body }) {
  return (
    <Link to={`id/${id}`} className={classes.post}>
      <li >
        <p className={classes.author}>by {author}</p>
        <p className={classes.title}>{title}</p>
        <p className={classes.body}>{body}</p>
      </li>
    </Link>
  );
}

export default Post;
