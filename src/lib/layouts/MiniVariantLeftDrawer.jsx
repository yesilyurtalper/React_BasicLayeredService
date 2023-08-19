import * as React from "react";
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
import classes from "./MiniVariantLeftDrawer.module.css";
import { Drawer, DrawerHeader, AppBar } from "./MiniVariantHelpers";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "../components/LoadingPage";
import { useEffect } from "react";

export default function MiniVariantDrawerWithHeader(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedPath, setSelectedPath] = React.useState(window.location.href);
  const auth = useAuth();
  const navigate = useNavigate();

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

            <Typography variant="h6" noWrap component="div">
              {props.title}
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
        >
        </DrawerHeader>

        <Divider />

        <List>
          {props.menuItems.map((menu, index) => (
            <div
              key={menu}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                margin: "5px",
                backgroundColor: selectedPath.includes(props.menuPaths[index])
                  ? "#dae4ef"
                  : "white",
              }}
            >
              <Link key={menu} to={props.menuPaths[index]}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => setSelectedPath(props.menuPaths[index])}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor: selectedPath.includes(
                        props.menuPaths[index]
                      )
                        ? "#dae4ef"
                        : "white",
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

      <Box component="main" sx={{ flexGrow: 1, p: 8 }}>
        {props.error && <ErrorPage />}
        {auth.isLoading && <LoadingPage />}
        {!props.error && !auth.isLoading && (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}