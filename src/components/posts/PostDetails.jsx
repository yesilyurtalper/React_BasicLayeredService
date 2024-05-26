import { TextField } from "@mui/material";
import classes from "./PostDetails.module.css";
import withSWRInModal from "../common/withSWRInModal";

function PostDetailsComponent({ data: post }) {
  return (
    <section className={classes.content}>
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
    </section>
  );
}

const PostDetails = withSWRInModal(PostDetailsComponent, "posts");

export default PostDetails;
