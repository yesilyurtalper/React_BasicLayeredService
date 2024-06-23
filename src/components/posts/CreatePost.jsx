import PostForm from "./PostForm";
import withSWRForCreate from "../HOCs/withSWRForCreate";

const CreatePostWithSWR = withSWRForCreate(PostForm,"posts");

export default CreatePostWithSWR;