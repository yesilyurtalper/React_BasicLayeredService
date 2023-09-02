import "./constants.js";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

import CustomStatusBar from "./components/CustomStatusBar";
import HomePage from "./pages/HomePage";
import MiniVariantDrawerWithHeader from "./components/MiniVariantLeftDrawer";

//menu icons
import PostsIcon from "@mui/icons-material/PostAdd.js";
import EventsIcon from "@mui/icons-material/Event.js";
import IngredientsIcon from "@mui/icons-material/Settings.js";

//route pages
import PostsLayout from "./pages/posts/PostsLayout";
import PostList from "./pages/posts/PostList";
import CreatePost from "./pages/posts/CreatePost.jsx";
import PostDetails from "./pages/posts/PostDetails";
import UpdatePost from "./pages/posts/UpdatePost.jsx";
import CopyPost from "./pages/posts/CopyPost";

//route events
import EventsPage from "./pages/events/EventsPage.jsx";
import CreateEvent from "./pages/events/CreateEvent.jsx";
import EventDetails from "./pages/events/EventDetails";
import UpdateEvent from "./pages/events/UpdateEvent.jsx";
import CopyEvent from "./pages/events/CopyEvent";

import Ingredients from "./pages/Ingredients";

//loaders and actions
import loader from "./services/loader.js";
import manipulateItemAction from "./services/manipulateItemAction.js";
import queryAction from "./services/queryAction.js";
import deleteAction from "./services/deleteItemAction.js"
import deleteItemAction from "./services/deleteItemAction.js";

function App() {
  const oidcConfig = {
    authority: window.OIDC_AUTHORITY,
    client_id: window.OIDC_CLIENT,
    redirect_uri: window.location.href,
    onSigninCallback: (_user) => {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = "/";
      window.user = _user;
    },
  };

  const menuPaths = ["posts", "events", "ingredients"];
  const menuItems = ["User Posts", "Technology Events", "Ingredients"];
  const menuIcons = [<PostsIcon />, <EventsIcon />, <IngredientsIcon />];
  const menuPages = [<PostsLayout />, <EventsPage />, <Ingredients />];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MiniVariantDrawerWithHeader
          title={window.PROJECT_TITLE}
          menuPaths={menuPaths}
          menuItems={menuItems}
          menuIcons={menuIcons}
          menuPages={menuPages}
          //customStatusBar={<CustomStatusBar />}
        />
      ),
      errorElement: (
        <MiniVariantDrawerWithHeader
          title={window.PROJECT_TITLE}
          menuPaths={menuPaths}
          menuItems={menuItems}
          menuIcons={menuIcons}
          menuPages={menuPages}
          //customStatusBar={<CustomStatusBar />}
          error
        />
      ),

      children: [
        { index: true, element: <HomePage /> },

        {
          path: menuPaths[0], //posts
          element: menuPages[0], //PostsLayout
          children: [
            { index: true, element: <PostList />, loader: loader },
            { path: "create", element: <CreatePost />, action: manipulateItemAction },
            {
              path: "id/:id",
              id: "postdetails",
              loader: loader,
              children: [
                { index: true, element: <PostDetails />, action: deleteItemAction },
                { path: "update", element: <UpdatePost />, action: manipulateItemAction },
                { path: "copy", element: <CopyPost />, action: manipulateItemAction },
              ],
            },
          ],
        },

        {
          path: menuPaths[1], //events
          children: [
            {
              index: true,
              element: <EventsPage />,
              errorElement: <EventsPage />,
              action: queryAction,
            },
            { path: "create", element: <CreateEvent />, action: manipulateItemAction },
            {
              path: "id/:id",
              id: "eventdetails",
              loader: loader,
              children: [
                { index: true, element: <EventDetails />, action: deleteItemAction },
                { path: "update", element: <UpdateEvent />, action: manipulateItemAction },
                { path: "copy", element: <CopyEvent />, action: manipulateItemAction },
              ],
            },
          ],
        },

        {
          path: menuPaths[2], //ingredients
          element: menuPages[2],
        },
      ],
    },
  ]);

  const key = `oidc.user:${window.OIDC_AUTHORITY}:${window.OIDC_CLIENT}`;
  const temp = sessionStorage.getItem(key);
  if (temp) window.user = JSON.parse(temp);

  return (
    <React.StrictMode>
      <AuthProvider {...oidcConfig}>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
