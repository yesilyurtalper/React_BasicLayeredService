import classes from "./Error.module.css";

export default function Error({ result }) {
  if (!result) return;
  else if (result.isSuccess)
    return <p className={classes.success}> {result.message}</p>;
  else
    return (
      <div className={classes.error}>
        {result?.resultCode && (
          <span key={1} className={classes.li}>
            Result Code: {result.resultCode}
          </span>
        )}
        {result?.message && (
          <div key={2} className={classes.li}>
            {result.message}
          </div>
        )}
        {result?.errorMessages?.map((err) => (
          <div key={err} className={classes.li}>
            {err}
          </div>
        ))}
      </div>
    );
}
