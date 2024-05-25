import { Form, useActionData } from "react-router-dom";
import classes from "../../components/posts/PostDetails.module.css";
import Modal from "../common/Modal";
import { useAuth } from "react-oidc-context";
import { TextField } from "@mui/material";
import Error from "../common/Error";
import SubmitCancelActions from "../common/actions/SubmitCancelActions";

export default function PostForm({ method, post }) {
  const auth = useAuth();
  const actionResult = useActionData();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <Error result={actionResult}/>

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
