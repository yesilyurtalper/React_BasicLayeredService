import { useAuth } from "react-oidc-context";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigation } from "react-router-dom";

export default function HomePage(props) {
  const auth = useAuth();
  const navigation = useNavigation();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {navigation.state === "loading" && <CircularProgress/>}

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
