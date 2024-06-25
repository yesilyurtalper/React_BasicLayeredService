import classes from "./DetailsActions.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useSubmit,
  useNavigation,
  useParams,
  useActionData,
} from "react-router-dom";
import { useEffect } from "react";
import { eventActions } from "../../../store/eventStore";
import { postActions } from "../../../store/postStore";
import useDataFromCache from "../../../services/useDataFromCache";

export default function DetailsActions({entity, manipulate}) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const loading = navigation.state === "loading";
  const params = useParams();
  const items = useDataFromCache(entity);
  
  const dispatch = useDispatch();
  const itemIndex = items.findIndex(item => item.id == params.id);
  const actionResult = useActionData();
  const submit = useSubmit();

  function handleDelete() {
    const proceed = window.confirm("Are you sure to delete?");
    if (proceed) submit(null, { method: "delete" });
  }

  useEffect(() => {
    if (actionResult && actionResult.isSuccess) {
      let filtered = items.filter((c) => c.id != actionResult.data.id);
      let redirect =
        filtered.length > 0 ? `/${entity}/id/${filtered[0].id}` : "";

      if (entity === "events")
        dispatch(eventActions.deleteEvent(actionResult.data.id));
      else if (entity === "posts")
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
            navigate(`/${entity}/id/${items[itemIndex - 1].id}`)
          }
          variant="contained"
          disabled={submitting || loading || !items[itemIndex - 1]}
        >
          Prev
        </Button>

        <Button
          onClick={() =>
            navigate(`/${entity}/id/${items[itemIndex + 1].id}`)
          }
          variant="contained"
          disabled={submitting || loading || !items[itemIndex + 1]}
        >
          Next
        </Button>
      </div>

      {navigation.state != "idle" && <CircularProgress />}

      {manipulate && (
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
