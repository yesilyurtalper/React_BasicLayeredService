import "./constants.js";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRoutes from "./utility/createRoutes.js";
import { useAuth } from "react-oidc-context";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import Login from "./components/common/Login.jsx";
import { commonActions } from "./store/commonStore.js";
import { useDispatch } from "react-redux";

function App() {
  const auth = useAuth();
  const [logging, setLogging] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      dispatch(commonActions.setUser({}));
      if (!auth?.isLoading && !logging) {
        setLogging(true);
        auth.signinRedirect();
      }
    }
  }, [auth,logging,dispatch]);

  useEffect(() => {
    if(auth?.user && auth?.isAuthenticated)
      dispatch(commonActions.setUser(auth?.user));
  }, [auth,dispatch]);

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
