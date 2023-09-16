import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import PostForm from "../../components/posts/PostForm";

function CopyPost() {

  const post = useRouteLoaderData("postdetails");

  return (
    <PostForm method="post" post={post.data} />
  );
}

export default CopyPost;
