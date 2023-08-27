import classes from "./ActionErrors.module.css";
import { useActionData } from "react-router-dom";

export default function ActionErrors() {

  const actionData = useActionData();
  
  if(!actionData || !actionData.isSuccess)
    return;

  return (
    <ul className={classes.errors}>
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
