import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import React from "react";

export default function HomePage(props) {
  const auth = useAuth();

  console.log("WelcomePage rendered");

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Welcome to React_BasicLayeredService</p>

      {!auth.isAuthenticated && <p>Please log in to continue</p>}

      {!auth.isAuthenticated && (
        <Button variant="contained" onClick={() => void auth.signinRedirect()}>
          Log in
        </Button>
      )}

      {auth.isAuthenticated && <p>{auth.user?.profile.name} </p>}

      {auth.isAuthenticated && (
        <Button
          variant="contained"
          onClick={() => {
            auth.removeUser();
            window.user = null;
          }}
        >
          Log out
        </Button>
      )}
    </main>
  );
}
