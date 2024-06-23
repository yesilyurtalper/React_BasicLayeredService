import PostForm from "./PostForm";
import withSWRForUpdate from "../HOCs/withSWRForUpdate";

const CopyPostWithSWR = withSWRForUpdate(PostForm,"posts","post");

export default CopyPostWithSWR;