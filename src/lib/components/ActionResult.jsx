import { act } from "react-dom/test-utils";
import classes from "./ActionResult.module.css";
import { useActionData } from "react-router-dom";

export default function ActionResult() {
  const actionData = useActionData();

  if (!actionData) return;
  else if (actionData.isSuccess)
    return <p className={classes.success}> {actionData.message}</p>;
  else
    return (
      <ul className={classes.error}>
        <li
          key={actionData.resultCode}
          style={{ listStyleType: "none", textAlign: "center" }}
        >
          Result Code: {actionData.resultCode}
        </li>
        <li
          key={actionData.message}
          style={{ listStyleType: "none", textAlign: "center" }}
        >
          {actionData.message}
        </li>
        {actionData.errorMessages.map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    );
}
