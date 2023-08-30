import "./constants.js";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

import CustomStatusBar from "./components/CustomStatusBar";
import HomePage from "./pages/HomePage";
import MiniVariantDrawerWithHeader from "./lib/layouts/MiniVariantLeftDrawer";

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
import EventsLayout from "./pages/events/EventsLayout";
import EventList from "./pages/events/EventList";
import CreateEvent from "./pages/events/CreateEvent.jsx";
import EventDetails from "./pages/events/EventDetails";
import UpdateEvent from "./pages/events/UpdateEvent.jsx"; 
import CopyEvent from "./pages/events/CopyEvent";

import Ingredients from "./pages/Ingredients";

//loaders and actions
import loader from "./services/loader.js";
import action from "./services/action.js";

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
  const menuIcons = [<PostsIcon />, <EventsIcon />, <IngredientsIcon/>];
  const menuPages = [<PostsLayout/>, <EventsLayout/>, <Ingredients/>];

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
            {index: true, element: <PostList />, loader: loader },
            {path: "create", element: <CreatePost />, action: action },
            {
              path: "id/:id",  
              id: "postdetails",
              loader: loader,
              children: [
                {index: true, element: <PostDetails/>, action: action},
                {path: "update", element: <UpdatePost/>, action: action },
                {path: "copy", element: <CopyPost/>, action: action }
              ] 
            },        
          ],
        },

        {
          path: menuPaths[1], //events
          element: menuPages[1], //EventsLayout
          children: [
            {index: true, element: <EventList />, loader: loader },
            {path: "create", element: <CreateEvent />, action: action },
            {
              path: "id/:id",  
              id: "eventdetails",
              loader: loader,
              children: [
                {index: true, element: <EventDetails/>, action: action},
                {path: "update", element: <UpdateEvent/>, action: action },
                {path: "copy", element: <CopyEvent/>, action: action }
              ] 
            },
            
          ],
        },

        {
          path: menuPaths[2],//ingredients
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
