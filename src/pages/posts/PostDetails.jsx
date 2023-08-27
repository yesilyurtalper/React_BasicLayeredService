import { useRouteLoaderData, useNavigate, Await } from "react-router-dom";
import { Suspense } from "react";
import { TextField } from "@mui/material";
import Modal from "../../lib/components/Modal";
import classes from "./PostDetails.module.css";
import ActionErrors from "../../lib/components/ActionErrors";
import Actions from "../../lib/components/Actions";

export default function PostDetails() {
  const { post } = useRouteLoaderData("postdetails");
  const navigate = useNavigate();

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading selected post...</p>}
    >
      <Await resolve={post}>
        {(post) => (
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
                  <ActionErrors />

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
        )}
      </Await>
    </Suspense>
  );
}
