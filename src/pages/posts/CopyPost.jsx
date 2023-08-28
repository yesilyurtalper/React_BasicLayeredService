import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import PostForm from "../../components/posts/PostForm";

function CopyPost() {
  const { data } = useRouteLoaderData("postdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected post...</p>}
    >
      <Await resolve={data}>
        {(post) => <PostForm method="POST" post={post} />}
      </Await>
    </Suspense>
  );
}

export default CopyPost;
