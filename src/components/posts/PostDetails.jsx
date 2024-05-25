
import { TextField } from "@mui/material";
import Modal from "../common/Modal";
import classes from "./PostDetails.module.css";
import DetailsActions from "../common/actions/DetailsActions";
import withSWR from "../common/withSWR";
import Error from "../common/Error";

function PostDetailsComponent({data:post,error}) {
  console.log(error);
  return (
    <Modal>
      <main className={classes.details}>
        <DetailsActions manipulate item="posts" />
        {error && <Error result={error}/>}
        <section className={classes.content}>
          <TextField
            label="Post Id"
            readOnly
            variant="standard"
            value={post?.id}
          />

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
      </main>
    </Modal>
  );
}

const PostDetails = withSWR(PostDetailsComponent,"posts");

export default PostDetails;