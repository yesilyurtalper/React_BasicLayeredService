
import { useAuth } from "react-oidc-context";
import { TextField } from "@mui/material";
import withModalForUpdate from "../common/withModalForUpdate";
import withEmptyForm from "../common/withEmptyForm ";

function PostForm({ method, data:post }) {
  const auth = useAuth();

  return (
    <>
      <TextField
        label="Post Id"
        name="Id"
        readOnly
        variant="standard"
        value={method === "put" ? post?.id : 0}
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
    </>
  );
}

export const UpdatePost = withModalForUpdate(PostForm,"posts","put");
export const CopyPost = withModalForUpdate(PostForm,"posts","post");
export const CreatePost = withEmptyForm(PostForm,"posts");