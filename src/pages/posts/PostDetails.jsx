import { useRouteLoaderData, useActionData } from "react-router-dom";
import { TextField } from "@mui/material";
import Modal from "../../components/Modal";
import classes from "./PostDetails.module.css";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import DetailsActions from "../../components/DetailsActions";

export default function PostDetails() {
  const loaderResult = useRouteLoaderData("postdetails");
  const actionResult = useActionData();
  const post = loaderResult.data;

  return (
    <Modal>
      <main className={classes.details}>
        <DetailsActions manipulate item="posts" />
        <ActionLoaderResult result={actionResult} />

        {!loaderResult.isSuccess && (
          <ActionLoaderResult result={loaderResult} />
        )}
        {loaderResult.isSuccess && (
          <section className={classes.content}>
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
          </section>
        )}
      </main>
    </Modal>
  );
}
