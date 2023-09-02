import { Form } from "react-router-dom";
import classes from "../../pages/posts/PostDetails.module.css";
import Modal from "../Modal";
import { useAuth } from "react-oidc-context";
import Actions from "../ActionButtons";
import { TextField } from "@mui/material";
import ActionResult from "../../components/ActionResult";

export default function PostForm({ method, post }) {
  const auth = useAuth();

  return (
    <Modal>
      <Form method={method} className={classes.details}>
        <ActionResult />

        <TextField
          label="Post Id"
          name="Id"
          InputProps={{readOnly: true }}
          variant="standard"
          defaultValue={method === "put" ? post.id : 0}
          style={method === "put" ? undefined : { display: "none" }}
        />

        <TextField
          label="Author"
          name="Author"
          InputProps={{readOnly: true }}
          variant="standard"
          defaultValue={auth.user.profile.preferred_username}
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

        <Actions small />
      </Form>
    </Modal>
  );
}
