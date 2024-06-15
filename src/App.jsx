import "./constants.js";
import { RouterProvider } from "react-router-dom";
import createRoutes from "./utility/createRoutes.js";
import LogInOut from "./components/common/LogInOut.jsx";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

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
      }}
    >
      <LogInOut text="Login with Keycloak" />
    </div>
  );
}

export default App;
