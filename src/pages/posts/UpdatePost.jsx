import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import PostForm from "../../components/posts/PostForm";

function UpdatePost() {
  const { data } = useRouteLoaderData("postdetails");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected post...</p>}
    >
      <Await resolve={data}>
        {(post) => <PostForm method="PUT" post={post} />}
      </Await>
    </Suspense>
  );
}

export default UpdatePost;
