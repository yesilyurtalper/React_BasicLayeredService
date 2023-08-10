import MiniVariantDrawerWithHeader from "./lib/layout/MiniVariantDrawerWithHeader";
import PostingIcon from "@mui/icons-material/MoveToInbox";
import IngredientsIcon from "@mui/icons-material/Mail";
import UserPosting from "./pages/UserPosting";
import Ingredients from "./pages/Ingredients";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  const menuPaths = ["posting", "ingredients"];
  const menuItems = ["User Posting", "Ingredients"];
  const menuIcons = [<PostingIcon />, <IngredientsIcon />];
  const menuPages = [<UserPosting />, <Ingredients />];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MiniVariantDrawerWithHeader
          title="React_BasicLayeredService"
          menuPaths={menuPaths}
          menuItems={menuItems}
          menuIcons={menuIcons}
          menuPages={menuPages}
        />
      ),
      children: [
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
          element: <p>tetstrtewtewt</p>,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
