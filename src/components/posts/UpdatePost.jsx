import withSWR from "../common/withSWR";

import PostForm from "./PostForm";

function UpdatePostComponent({data:post}) {

  return (
    <PostForm method="put" post={post} />
  );
}

const UpdatePost = withSWR(UpdatePostComponent, "posts");

export default UpdatePost;