import MiniVariantDrawerWithHeader from "./lib/layouts/MiniVariantLeftDrawer";
import PostsIcon from "@mui/icons-material/MoveToInbox";
import IngredientsIcon from "@mui/icons-material/Mail";
import Posts from "./pages/Posts";
import { postListLoader } from "./loaders/postListLoader";
import { postDetailsLoader } from "./loaders/postDetailsLoader";
import NewPost, { action as newPostAction } from "./components/posts/NewPost";
import PostDetails from "./components/posts/PostDetails";
import Ingredients from "./pages/Ingredients";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import React from "react";
import "./constants.js";
import CustomStatusBar from "./components/CustomStatusBar";
import HomePage from "./pages/HomePage";
import PostList from "./components/posts/PostList";

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

  const menuPaths = ["posts", "ingredients"];
  const menuItems = ["User Posts", "Ingredients"];
  const menuIcons = [<PostsIcon />, <IngredientsIcon />];
  const menuPages = [<Posts />, <Ingredients />];

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
          path: menuPaths[0],
          element: menuPages[0],
          children: [
            {index: true, element: <PostList />, loader: postListLoader },
            {path: ":id", element: <PostDetails />, loader: postDetailsLoader },
            { path: "new", element: <NewPost />, action: newPostAction },
          ],
        },

        {
          path: menuPaths[1],
          element: menuPages[1],
          children: [
            { path: "new", element: <p>create-ingredient</p> },
            { path: ":id", element: <p>ingredient-details</p> }
          ],
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
