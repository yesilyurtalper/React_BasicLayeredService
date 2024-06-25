import withSWR from "../HOCs/withSWR";
import Post from "./Post";
import classes from "./PostList.module.css";

const PostList = ({data}) => {
  return (
    <>
      {!data?.length ? (
        <div style={{ textAlign: "center"}}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      ) : (
        <div className={classes.list}>
          {data?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
      )}
    </>
  );
}

const PostListWithSWR = withSWR(PostList,"posts");

export default PostListWithSWR;
