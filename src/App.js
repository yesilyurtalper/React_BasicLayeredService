import MiniVariantDrawerWithHeader from "./lib/layout/MiniVariantDrawerWithHeader";
import PostingIcon from "@mui/icons-material/MoveToInbox";
import IngredientsIcon from "@mui/icons-material/Mail";
import UserPosting from "./pages/UserPosting";
import Ingredients from "./pages/Ingredients";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import React from "react";
import "./constants.js";
import CustomStatusBar from "./components/CustomStatusBar";
import WelcomePage from "./components/WelcomePage";

function App() {
  console.log(window.location.href);

  const oidcConfig = {
    authority: window.OIDC_AUTHORITY,
    client_id: window.OIDC_CLIENT,
    redirect_uri: window.location.href,
    onSigninCallback: (_user) => {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = window.location.href;
    },
  };

  const menuPaths = ["posting", "ingredients"];
  const menuItems = ["User Posting", "Ingredients"];
  const menuIcons = [<PostingIcon />, <IngredientsIcon />];
  const menuPages = [<UserPosting />, <Ingredients />];

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
          customStatusBar={<CustomStatusBar />}
        />
      ),
      children: [
        {
          path: "/",
          element: <WelcomePage />,
        },
        {
          path: menuPaths[0],
          element: menuPages[0],
          //loader: postsLoader,
          children: [
            { path: "newpost", element: <p>create-post</p> }, //, action: newPostAction },
            { path: ":postId", element: <p>post-details</p> }, //, loader: postDetailsLoader }
          ],
        },
        {
          path: menuPaths[1],
          element: menuPages[1],
          //loader: postsLoader,
          children: [
            { path: "newingredient", element: <p>create-ingredient</p> }, //, action: newPostAction },
            { path: ":ingredientId", element: <p>ingredient-details</p> }, //, loader: postDetailsLoader }
          ],
        },
        {
          path: "test",
          element: <p>test</p>,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <AuthProvider {...oidcConfig}>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
