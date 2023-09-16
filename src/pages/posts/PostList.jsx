import { useLoaderData, Await, useNavigation } from "react-router-dom";
import Post from "../../components/posts/Post";
import classes from "./PostList.module.css";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { postActions } from "../../store/post";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";


export default function PostList() {
  const {loaderPromise} = useLoaderData();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  useEffect(() => {
    loaderPromise.then((result)=>{
      dispatch(postActions.setPosts(result.data));
    }).catch((err) => {console.log(err)});;
  }, [loaderPromise]);  

  return (
    <main>
      {loading && <CircularProgress/>}
      {!loading &&
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading Current User Posts...</p>
        }
      >
        <Await resolve={loaderPromise}>
          {(loaderResult) => (
            <>
              {!loaderResult.isSuccess && (
                <ActionLoaderResult result={loaderResult} />
              )}
              {loaderResult.data && loaderResult.data.length > 0 && (
                <ul className={classes.list}>
                  {loaderResult.data.map((post) => (
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
              {loaderResult.data && loaderResult.data.length === 0 && (
                <div style={{ textAlign: "center", color: "white" }}>
                  <h2>There are no posts yet.</h2>
                  <p>Start adding some!</p>
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>}
    </main>
  );
}
