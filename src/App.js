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
import Posts from "./pages/Posts";
import PostList from "./components/posts/PostList";
import CreatePost from "./components/posts/CreatePost.jsx";
import PostDetails from "./components/posts/PostDetails";
import UpdatePost from "./components/posts/UpdatePost.jsx"; 
import DeletePost from "./components/posts/DeletePost";

import Events from "./pages/Events";
import EventList from "./components/events/EventList";
import CreateEvent from "./components/events/CreateEvent.jsx";
import EventDetails from "./components/events/EventDetails";
import UpdateEvent from "./components/events/UpdateEvent.jsx"; 
import DeleteEvent from "./components/events/DeleteEvent";

import Ingredients from "./pages/Ingredients";

//loaders and actions
import postListLoader from "./loaders/postListLoader";
import postDetailsLoader from "./loaders/postDetailsLoader";
import eventListLoader from "./loaders/eventListLoader";
import eventDetailsLoader from "./loaders/eventDetailsLoader";

import createPostAction from "./actions/createPostAction";
import updatePostAction from "./actions/updatePostAction";
import deletePostAction from "./actions/deletePostAction";
import createEventAction from "./actions/createEventAction";
import updateEventAction from "./actions/updateEventAction";
import deleteEventAction from "./actions/deleteEventAction";

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
  const menuPages = [<Posts />, <Events />, <Ingredients/>];

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
          path: menuPaths[0],//posts
          element: menuPages[0],
          children: [
            {index: true, element: <PostList />, loader: postListLoader },
            {path: "new", element: <CreatePost />, action: createPostAction },
            {
              path: ":id",  
              id: "postdetails",
              loader: postDetailsLoader,
              children: [
                {index: true, element: <PostDetails/> },
                {path: "edit", element: <UpdatePost/>, action: updatePostAction },
                {path: "delete", element: <DeletePost/>, action: deletePostAction },
              ] 
            },
            
          ],
        },

        {
          path: menuPaths[1],//events
          element: menuPages[1],
          children: [
            {index: true, element: <EventList />, loader: eventListLoader },
            {path: "new", element: <CreateEvent />, action: createEventAction },
            {
              path: ":id",  
              id: "eventdetails",
              loader: eventDetailsLoader,
              children: [
                {index: true, element: <EventDetails/> },
                {path: "edit", element: <UpdateEvent/>, action: updateEventAction },
                {path: "delete", element: <DeleteEvent/>, action: deleteEventAction },
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
