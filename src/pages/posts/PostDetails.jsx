import { useRouteLoaderData, useNavigate, Await } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./PostDetails.module.css";
import ActionResult from "../../lib/components/ActionResult";
import Actions from "../../lib/components/Actions";

export default function PostDetails() {
  const post = useRouteLoaderData("postdetails");
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("..")}>
      <main className={classes.details}>
        {!post && (
          <>
            <h1>Could not find post</h1>
            <p>Unfortunately, the requested post could not be found.</p>
          </>
        )}
        {post && (
          <>
            <ActionResult />

            <TextField
              label="Post Id"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={post.id}
            />

            <TextField
              label="Author"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={post.author}
            />

            <TextField
              label="Title"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              value={post.title}
            />

            <TextField
              label="Body"
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={3}
              variant="standard"
              value={post.body}
            />

            <TextField
              label="Created Date"
              InputProps={{
                readOnly: true,
              }}
              type="datetime"
              variant="standard"
              value={post.dateCreated}
            />

            <TextField
              label="Updated Date"
              InputProps={{
                readOnly: true,
              }}
              type="datetime"
              variant="standard"
              value={post.dateModified}
            />

            <Actions />
          </>
        )}
      </main>
    </Modal>
  );
}
