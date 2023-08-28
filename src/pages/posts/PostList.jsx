import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import Post from "../../components/posts/Post";
import classes from "./PostList.module.css";

export default function PostList() {
  const {data} = useLoaderData();

  return (
    
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading current posts...</p>
        }
      >
        <Await resolve={data}>
          {(posts) => (
            <main>
              {posts.length > 0 && (
                <ul className={classes.list}>
                  {posts.map((post) => (
                    <Post
                      key={post.id}
                      id={post.id}
                      author={post.author}
                      title={post.title}
                      body={post.body}
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
          )}
        </Await>
      </Suspense>
  );
}
