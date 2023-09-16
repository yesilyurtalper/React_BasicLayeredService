
import classes from "./ActionLoaderResult.module.css";

export default function ActionLoaderResult({result}) {

  if (!result) return;
  else if (result.isSuccess)
    return <p className={classes.success}> {result.message}</p>;
  else
    return (
      <ul className={classes.error}>
        <li
          key={1}
          style={{ listStyleType: "none", textAlign: "center" }}
        >
          Result Code: {result.resultCode}
        </li>
        <li
          key={2}
          style={{ listStyleType: "none", textAlign: "center" }}
        >
          {result.message}
        </li>
        {result.errorMessages.map((err) => (
          <li key={err} style={{ listStyleType: "none", textAlign: "center" }}>{err}</li>
        ))}
      </ul>
    );
}
