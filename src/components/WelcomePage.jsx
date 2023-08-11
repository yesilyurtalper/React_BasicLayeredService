import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function WelcomePage(props) {
  const auth = useAuth();

  console.log("customStatusBar rendered");

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
        Welcome to React_BasicLayeredService
      </Typography>

      {!auth.isAuthenticated && (
        <Button variant="contained" onClick={() => void auth.signinRedirect()}>
          Log in
        </Button>
      )}

      {auth.isAuthenticated && (
        <Typography variant="h6" noWrap component="div">
          {auth.user?.profile.name}{" "}
        </Typography>
      )}

      {auth.isAuthenticated && (
        <Button
          variant="contained"
          onClick={() => {
            auth.removeUser();
          }}
        >
          Log out
        </Button>
      )}
    </div>
  );
}
