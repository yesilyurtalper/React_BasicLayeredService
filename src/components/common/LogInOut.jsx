import { Button } from "@mui/material";
import { useAuth } from "react-oidc-context";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { commonActions } from "../../store/commonStore";
import {CircularProgress} from "@mui/material";

export default function LogInOut({ text }) {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
    if(auth?.isAuthenticated && auth?.user && !userSet) {
      console.log("user set in common store");
      dispatch(commonActions.setUser(auth?.user));
      setUserSet(true);
    }
  }, [auth,userSet,dispatch])
  
  if (auth?.isLoading)
    return <CircularProgress/>;

  return (
    <>
      {!auth.isAuthenticated ? (
        <Button
          variant="contained"
          onClick={() => {
            auth.signinPopup();
          }}
        >
          {text ?? "Login"}
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
              auth.removeUser();
              dispatch(commonActions.setUser(null));
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}
