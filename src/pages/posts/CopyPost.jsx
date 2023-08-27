import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import PostForm from "../../components/posts/PostForm";

function CopyPost() {
  const { post } = useRouteLoaderData("postdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected post...</p>}
    >
      <Await resolve={post}>
        {(post) => <PostForm method="POST" post={post} />}
      </Await>
    </Suspense>
  );
}

export default CopyPost;
