import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, Link } from "react-router-dom";
import { useAuth, hasAuthParams } from "react-oidc-context";
import classes from "./MiniVariantDrawerWithHeader.module.css";
import { Drawer, DrawerHeader, AppBar } from "./MiniVariantDrawerHelpers";
import { Button } from "@mui/material";

export default function MiniVariantDrawerWithHeader(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedPath, setSelectedPath] = React.useState(window.location.href);
  const auth = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log("MiniVariantDrawerWithHeader rendered");

  /* React.useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.signinRedirect]); */

  /* switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  } */

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
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
                ...(open && { display: "none" }),
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
            <div style={{ display: "flex", flexDirection:"row", justifyContent:"space-between", gap: "10px", alignItems:"center" }}>
              {props.customStatusBar}
              <Typography variant="h6" noWrap component="div">
                {auth.user?.profile.name}{" "}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {auth.removeUser();}}
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
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {props.menuItems.map((menu, index) => (
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
                      ? "lightblue"
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
                  <ListItemText primary={menu} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
