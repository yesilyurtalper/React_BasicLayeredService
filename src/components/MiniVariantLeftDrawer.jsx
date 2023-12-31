import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { Drawer, DrawerHeader, AppBar } from "./MiniVariantHelpers";
import { Button} from "@mui/material";
import { useNavigate, useNavigation } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import classes from "./MiniVariantLeftDrawer.module.css";

export default function MiniVariantDrawerWithHeader(props) {
  let relUrl = window.location.href.split(`${window.location.origin}/`)[1];
  let currentIndex = props.menuPaths.indexOf(relUrl.split("/")[0]);
  let currentMenuItem =
    props.menuItems[currentIndex] ?? "";
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={false}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap sx={{ alignSelf: "center" }}>
              {props.title + " / " + currentMenuItem}
            </Typography>
          </div>

          {!auth.isAuthenticated && (
            <Button
              variant="contained"
              onClick={() => void auth.signinRedirect()}
            >
              Log in
            </Button>
          )}

          {auth.isAuthenticated && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {props.customStatusBar}
              <Typography variant="h6" noWrap component="div">
                {auth.user?.profile.name}{" "}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  auth.removeUser();
                  window.user = null;
                  navigate("/");
                }}
              >
                Log out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        ></DrawerHeader>

        <Divider />

        <List>
          {props.menuItems.map((menu, index) => (
            <div
              key={menu}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                margin: "5px",
                backgroundColor: index === currentIndex ? "#dae4ef" : "white",
              }}
            >
              <Link key={menu} to={props.menuPaths[index]}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor: index === currentIndex ? "#dae4ef" : "white",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {props.menuIcons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={menu}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
        
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
        {props.error && <ErrorPage />}
        {auth.isLoading && <p>Signing you in...</p>}
        {!props.error && !auth.isLoading && <Outlet />}
      </Box>
    </Box>
  );
}
