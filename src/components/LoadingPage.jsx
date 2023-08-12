import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouteError } from "react-router-dom";

export default function LoadingPage(props) {
  const error = useRouteError();
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <Typography variant="h6" noWrap component="div">
        Loading...
      </Typography>
    </div>
  );
}
