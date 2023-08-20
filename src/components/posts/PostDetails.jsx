import { useRouteLoaderData, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./PostDetails.module.css";
import { Button } from "@mui/material";

export default function PostDetails() {
  const post = useRouteLoaderData("postdetails");
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..", { relative: "path" });
  }

  console.log(post);

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
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
          rows={3}
          maxRows={5}
        />

        <TextField
          label="Created Date"
          value={post.dateCreated}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          type="datetime"
        />

        <TextField
          label="Updated Date"
          value={post.dateModified}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          type="datetime"
        />

        <p className={classes.actions}>
          <Button onClick={closeHandler} variant="contained">
            Close
          </Button>
        </p>
      </main>
    </Modal>
  );
}
