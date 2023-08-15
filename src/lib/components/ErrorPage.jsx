import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(props) {

  const error = useRouteError();
  let errorMessage = error.message;
  console.log(JSON.stringify(error));

  if(isRouteErrorResponse(error))
    errorMessage = `${error.statusText} : ${error.data}`;
  
  return (
    <main>
      <p>
        {`Error: ${errorMessage}`}
      </p>
    </main>
  );
}
