import { useAuth } from "react-oidc-context";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log("customStatusBar rendered");

  if (auth.isLoading || auth.activeNavigator) {
    return (
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{ textAlign: "center", marginTop: "1rem" }}
      >
        Signing you in...
      </Typography>
    );
  }

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

      {/* {auth.isAuthenticated && (
        <Typography variant="h6" noWrap component="div">
          {auth.user?.profile.name}{" "}
        </Typography>
      )} */}

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
    </div>
  );
}
