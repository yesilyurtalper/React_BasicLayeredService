import classes from "./ActionButtons.module.css";
import { Button } from "@mui/material";
import { useNavigate, useSubmit, useNavigation } from "react-router-dom";

export default function Actions(props) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  function handleDelete() {
    const proceed = window.confirm("Are you sure to delete?");
    if (proceed) 
      submit(null, { method: "DELETE"});
  }

  return (
    <div className={classes.actions}>
      <Button
        onClick={() => navigate("..")}
        variant="contained"
        disabled={isSubmitting}
      >
        Back
      </Button>

      {!props.small &&<Button
        onClick={handleDelete}
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Delete"}
      </Button>}

      {!props.small &&<Button
        onClick={() => navigate("update")}
        variant="contained"
        disabled={isSubmitting}
      >
        Update
      </Button>}

      {!props.small &&<Button
        onClick={() => navigate("copy")}
        variant="contained"
        disabled={isSubmitting}
      >
        Copy
      </Button>}

      {props.small &&<Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>}

    </div>
  );
}
