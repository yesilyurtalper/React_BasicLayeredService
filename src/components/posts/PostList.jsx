import withSWRForList from "../common/withSWRForList";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostListComponent({data}) {
  return (
    <>
      {!data?.length ? (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      ) : (
        <ul className={classes.list}>
          {data?.map((post) => (
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
    </>
  );
}

const PostList = withSWRForList(PostListComponent,"posts");

export default PostList;
