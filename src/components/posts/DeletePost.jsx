import { useLoaderData, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./PostDetails.module.css";

export default function DeletePost() {
  const post = useLoaderData();

  console.log(post);

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." relative="path" className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        <TextField
          label="Post Id"
          value={post.id}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Author"
          value={post.author}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Title"
          value={post.title}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          label="Body"
          value={post.description}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          multiline
          maxRows={5}
        />
        <TextField
          label="Date"
          value={post.dateCreated}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          type="datetime"
        />
      </main>
    </Modal>
  );
}
