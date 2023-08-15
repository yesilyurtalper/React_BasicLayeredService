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
      { errorMessage.includes("401")  && 
        <p>
        {`You are unauthorized, try log out and log in again`}
      </p>}
      { errorMessage.includes("403")  && 
        <p>
        {`You are forbidden for this action!`}
      </p>}
    </main>
  );
}
