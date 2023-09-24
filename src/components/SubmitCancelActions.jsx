import classes from "./SubmitCancelActions.module.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useEffect } from "react";
import { eventActions } from "../store/eventStore";
import { postActions } from "../store/postStore";

export default function SubmitCancelActions(props) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const dispatch = useDispatch();
  const actionResult = useActionData();

  useEffect(() => {
    if (actionResult && actionResult.isSuccess) {
      switch (props.method) {
        case "put":
          if (props.item === "events")
            dispatch(eventActions.updateEvent(actionResult.data));
          else if (props.item === "posts")
            dispatch(postActions.updatePost(actionResult.data));
          break;
        case "post":
          if (props.item === "events")
            dispatch(eventActions.createEvent(actionResult.data));
          else if (props.item === "posts")
            dispatch(postActions.createPost(actionResult.data));
          break;
      }
      navigate(`/${props.item}/id/${actionResult.data.id}`);
    }
  }, [actionResult]);

  return (
    <div className={classes.actions}>
      <Button
        variant="contained"
        disabled={submitting}
        onClick={() => navigate("..")}
      >
        Cancel
      </Button>
      <Button type="submit" variant="contained" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
