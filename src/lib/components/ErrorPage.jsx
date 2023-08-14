import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage(props) {
  const error = useRouteError();
  
  return (
    <main>
      <p>
        {`Error: ${error.message}`}
      </p>
    </main>
  );
}
