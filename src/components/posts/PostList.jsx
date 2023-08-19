import { useLoaderData} from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PostList(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const posts = useLoaderData();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main>
      {posts.length > 0 && (
        <ul className={classes.list}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
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
    </main>
  );
}
