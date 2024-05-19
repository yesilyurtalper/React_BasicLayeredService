import "./constants.js";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRoutes from "./utility/createRoutes.js";
import { useAuth } from "react-oidc-context";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import Login from "./components/common/Login.jsx";

function App() {
  const auth = useAuth();
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    if (!auth?.isAuthenticated && !auth?.isLoading && !logging) {
      setLogging(true);
      auth.signinRedirect();
    }
  }, [auth, logging]);

  if (auth?.isAuthenticated)
    return <RouterProvider router={createRoutes(auth?.user?.profile)} />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {auth?.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <p>Authentication Failed!</p>
          <Login text="Retry" />
        </>
      )}

      {auth.activeNavigator === "signinRedrect" && <p>Signing you in...</p>}
      {auth.activeNavigator === "signoutSilent" && <p>Signing you out...</p>}
    </div>
  );
}

export default App;
