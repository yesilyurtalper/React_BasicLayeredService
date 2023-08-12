import { useLoaderData} from "react-router-dom";

import Post from "../components/posts/Post";
import classes from "./Posts.module.css";
import { useAuth } from "react-oidc-context";

export default function Posts() {
  const posts = useLoaderData();
  const auth = useAuth();

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.description}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}
