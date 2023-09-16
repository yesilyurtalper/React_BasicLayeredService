import classes from "./DetailsActions.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  useNavigate,
  useSubmit,
  useNavigation,
  useParams,
  useActionData,
} from "react-router-dom";
import { useEffect } from "react";
import { eventActions } from "../store/event";
import { postActions } from "../store/post";

export default function DetailsActions(props) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const loading = navigation.state === "loading";
  const params = useParams();
  const cachedItems = useSelector((state) => {
    if (props.item === "events") return state.eventStore.events;
    else if (props.item === "posts") return state.postStore.posts;
    else return [];
  });

  const dispatch = useDispatch();
  const itemIndex = cachedItems.findIndex((item) => item.id == params.id);
  const actionResult = useActionData();
  const submit = useSubmit();

  function handleDelete() {
    const proceed = window.confirm("Are you sure to delete?");
    if (proceed) submit(null, { method: "delete" });
  }

  useEffect(() => {
    if (actionResult && actionResult.isSuccess) {
      let filtered = cachedItems.filter((c) => c.id != actionResult.data.id);
      let redirect =
        filtered.length > 0 ? `/${props.item}/id/${filtered[0].id}` : "";

      if (props.item === "events")
        dispatch(eventActions.deleteEvent(actionResult.data.id));
      else if (props.item === "posts")
        dispatch(postActions.deletePost(actionResult.data.id));

      navigate(redirect);
    }
  }, [actionResult]);

  return (
    <div className={classes.main}>
      <div className={classes.navigation}>
        <Button
          onClick={() => navigate("..")}
          variant="contained"
          disabled={submitting || loading}
        >
          List
        </Button>

        <Button
          onClick={() =>
            navigate(`/${props.item}/id/${cachedItems[itemIndex - 1].id}`)
          }
          variant="contained"
          disabled={submitting || loading || !cachedItems[itemIndex - 1]}
        >
          Prev
        </Button>

        <Button
          onClick={() =>
            navigate(`/${props.item}/id/${cachedItems[itemIndex + 1].id}`)
          }
          variant="contained"
          disabled={submitting || loading || !cachedItems[itemIndex + 1]}
        >
          Next
        </Button>
      </div>

      {navigation.state != "idle" && <CircularProgress />}

      {props.manipulate && (
        <div className={classes.manipulate}>
          <Button
            onClick={() => navigate("copy")}
            variant="contained"
            disabled={submitting || loading}
          >
            Copy
          </Button>

          <Button
            onClick={() => navigate("update")}
            variant="contained"
            disabled={submitting || loading}
          >
            Update
          </Button>

          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={submitting || loading}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
