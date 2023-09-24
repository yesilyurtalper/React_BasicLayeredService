import "./constants.js";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import store from "./store/indexStore";

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
import listLoader from "./services/listLoader.js";
import itemLoader from "./services/itemLoader.js";
import crudAction from "./services/crudAction.js";

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
            { index: true, element: <PostList />, loader: listLoader },
            {
              path: "create",
              element: <CreatePost />,
              action: crudAction,
            },
            {
              path: "id/:id",
              id: "postdetails",
              loader: itemLoader,
              children: [
                {
                  index: true,
                  element: <PostDetails />,
                  action: crudAction,
                },
                {
                  path: "update",
                  element: <UpdatePost />,
                  action: crudAction,
                },
                {
                  path: "copy",
                  element: <CopyPost />,
                  action: crudAction,
                },
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
              action: crudAction,
            },
            {
              path: "create",
              element: <CreateEvent />,
              action: crudAction,
            },
            {
              path: "id/:id",
              id: "eventdetails",
              loader: itemLoader,
              children: [
                {
                  index: true,
                  element: <EventDetails />,
                  action: crudAction,
                },
                {
                  path: "update",
                  element: <UpdateEvent />,
                  action: crudAction,
                },
                {
                  path: "copy",
                  element: <CopyEvent />,
                  action: crudAction,
                },
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
      <Provider store={store}>
        <AuthProvider {...oidcConfig}>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
