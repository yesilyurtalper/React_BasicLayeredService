import { Form, useActionData } from "react-router-dom";
import classes from "../../pages/posts/PostDetails.module.css";
import Modal from "../Modal";
import { useAuth } from "react-oidc-context";
import { TextField } from "@mui/material";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import SubmitCancelActions from "../SubmitCancelActions";
import DetailsActions from "../DetailsActions";

export default function PostForm({ method, post }) {
  const auth = useAuth();
  const actionResult = useActionData();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <ActionLoaderResult result={actionResult}/>

        <TextField
          label="Post Id"
          name="Id"
          readOnly
          variant="standard"
          value={method === "put" ? post.id : 0}
          style={method === "put" ? undefined : { display: "none" }}
        />

        <TextField
          label="Author"
          name="Author"
          readOnly
          variant="standard"
          value={auth.user.profile.preferred_username}
        />

        <TextField
          label="Title"
          name="Title"
          required
          variant="standard"
          defaultValue={post ? post.title : ""}
        />

        <TextField
          label="Body"
          name="Body"
          required
          multiline
          rows={5}
          variant="standard"
          defaultValue={post ? post.body : ""}
        />

        <SubmitCancelActions item="posts" method={method}/>
      </Form>
    </Modal>
  );
}
