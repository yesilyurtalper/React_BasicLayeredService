import PostForm from "./PostForm";
import withSWRForUpdate from "../HOCs/withSWRForUpdate";

const UpdatePostWithSWR = withSWRForUpdate(PostForm,"posts","put");

export default UpdatePostWithSWR;