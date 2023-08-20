import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(props) {
  const error = useRouteError();
  let errorMessage = error.message;
  console.log(JSON.stringify(error));

  if (isRouteErrorResponse(error))
    errorMessage = `${error.statusText} : ${error.data}`;

  let warning = <p/>;
  if (errorMessage.includes("400"))
    warning = <p>Check your request parameters!</p>;
  else if (errorMessage.includes("401"))
    warning = <p>You are unauthorized, try log out and log in again</p>;
  else if (errorMessage.includes("403"))
    warning = <p>You are forbidden for this action!</p>;
  else if (errorMessage.includes("404"))
    warning = <p>Data entity or end point not found!</p>;
  else if (errorMessage.includes("500"))
    warning = <p>Something went wrong on the server!</p>;

  return (
    <main>
      <p>{`Error: ${errorMessage}`}</p>
      {warning}
    </main>
  );
}
