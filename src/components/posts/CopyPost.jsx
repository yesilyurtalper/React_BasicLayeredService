import withSWR from "../common/withSWR";

import PostForm from "./PostForm";

function CopyPostComponent({data:post}) {

  return (
    <PostForm method="post" post={post} />
  );
}

const CopyPost = withSWR(CopyPostComponent,"posts");

export default CopyPost;