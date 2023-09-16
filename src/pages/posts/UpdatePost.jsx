import { useRouteLoaderData } from "react-router-dom";

import PostForm from "../../components/posts/PostForm";

function UpdatePost() {
  const post = useRouteLoaderData("postdetails");

  return (
    <PostForm method="put" post={post.data} />
  );
}

export default UpdatePost;
