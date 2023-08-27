import { Form } from "react-router-dom";
import classes from "../../pages/posts/PostDetails.module.css";
import Modal from "../../lib/components/Modal";
import { useAuth } from "react-oidc-context";
import ActionErrors from "../../lib/components/ActionErrors";
import Actions from "../../lib/components/Actions";
import { TextField } from "@mui/material";

export default function PostForm({ method, post }) {
  const auth = useAuth();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <ActionErrors />

        <TextField
          label="Post Id"
          name="Id"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          defaultValue={method === "PUT" ? post.id : 0}
          style={method === "PUT" ? undefined : { display: "none" }}
        />

        <TextField
          label="Author"
          name="Author"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          defaultValue={auth.user.profile.preferred_username}
        />

        <TextField
          label="Title"
          name="Title"
          required
          InputProps={{
            readOnly: false,
          }}
          variant="standard"
          defaultValue={post ? post.title : ""}
        />

        <TextField
          label="Body"
          name="Body"
          required
          InputProps={{
            readOnly: false,
          }}
          multiline
          rows={5}
          variant="standard"
          defaultValue={post ? post.body : ""}
        />

        <Actions small />
      </Form>
    </Modal>
  );
}
