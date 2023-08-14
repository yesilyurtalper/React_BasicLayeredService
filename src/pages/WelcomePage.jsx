import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading || auth.activeNavigator) {
    return (
      <main>
        <p>
          Signing you in...
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>
        Welcome to React_BasicLayeredService
      </p>

      {!auth.isAuthenticated && (
        <Button variant="contained" onClick={() => void auth.signinRedirect()}>
          Log in
        </Button>
      )}

      {auth.isAuthenticated && (
        <p>
          {auth.user?.profile.name}{" "}
        </p>
      )}

      {auth.isAuthenticated && (
        <Button
          variant="contained"
          onClick={() => {
            auth.removeUser();
            navigate("/");
          }}
        >
          Log out
        </Button>
      )}
    </main>
  );
}
