import { TextField } from "@mui/material";
import withSWRForDetails from "../HOCs/withSWRForDetails";

function PostDetails({ data: post }) {
  return (
    <>
      <TextField label="Post Id" readOnly variant="standard" value={post?.id} />

      <TextField
        label="Author"
        readOnly
        variant="standard"
        value={post?.author}
      />

      <TextField
        label="Title"
        readOnly
        variant="standard"
        value={post?.title}
      />

      <TextField
        label="Body"
        readOnly
        multiline
        rows={3}
        variant="standard"
        value={post?.body}
      />

      <TextField
        label="Created Date"
        readOnly
        variant="standard"
        value={post?.dateCreated}
      />

      <TextField
        label="Updated Date"
        readOnly
        variant="standard"
        value={post?.dateModified}
      />
    </>
  );
}

const PostDetailsWithSWR = withSWRForDetails(PostDetails, "posts");

export default PostDetailsWithSWR;
