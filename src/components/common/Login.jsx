import { Button } from "@mui/material";
import { useAuth } from "react-oidc-context";
import Typography from "@mui/material/Typography";

export default function Login({ text }) {
  const auth = useAuth();

  if (auth?.activeNavigator === "signinRedirect") return <span disabled>Signing you in...</span>;
  if (auth?.activeNavigator === "signoutSilent") return <span disabled>Signing you out...</span>;

  return (
    <>
      {!auth.isAuthenticated ? (
        <Button
          variant="contained"
          onClick={() => {
            auth.signinRedirect();
          }}
        >
          {text ?? "Log in"}
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {auth.user?.profile.name}{" "}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              //auth.removeUser();
              auth.signoutSilent();
            }}
          >
            Log out
          </Button>
        </div>
      )}
    </>
  );
}
