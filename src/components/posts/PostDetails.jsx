import { TextField } from "@mui/material";
import withModalForDetails from "../common/withModalForDetails";

function PostDetailsComponent({ data: post }) {
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

const PostDetails = withModalForDetails(PostDetailsComponent, "posts");

export default PostDetails;
