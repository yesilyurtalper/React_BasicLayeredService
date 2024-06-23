import HomePage from "../components/common/layout/HomePage.jsx";
import MiniVariantDrawerWithHeader from "../components/common/layout/MiniVariantLeftDrawer";

//menu icons
import PostsIcon from "@mui/icons-material/PostAdd.js";
import EventsIcon from "@mui/icons-material/Event.js";
import IngredientsIcon from "@mui/icons-material/Settings.js";

//route components
import Posts from "../components/posts/PostsPage.jsx";
import UpdatePost from "../components/posts/UpdatePost.jsx";
import CopyPost from "../components/posts/CopyPost.jsx";
import CreatePost from "../components/posts/CopyPost.jsx";
import PostDetails from "../components/posts/PostDetails.jsx";

//route events
import EventsPage from "../components/events/EventsPage.jsx";
import CreateEvent from "../components/events/CreateEvent.jsx";
import EventDetails from "../components/events/EventDetails";
import UpdateEvent from "../components/events/UpdateEvent.jsx";
import CopyEvent from "../components/events/CopyEvent";

import Ingredients from "../components/ingredients/Ingredients.jsx";

import { createBrowserRouter } from "react-router-dom";

export default function createRoutes(user) {
  const menuPaths = ["posts", "events", "ingredients"];
  const menuItems = ["User Posts", "Technology Events", "Ingredients"];
  const menuIcons = [<PostsIcon />, <EventsIcon />, <IngredientsIcon />];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MiniVariantDrawerWithHeader
          title={window.PROJECT_TITLE}
          menuPaths={menuPaths}
          menuItems={menuItems}
          menuIcons={menuIcons}
        />
      ),
      errorElement: (
        <MiniVariantDrawerWithHeader
          title={window.PROJECT_TITLE}
          menuPaths={menuPaths}
          menuItems={menuItems}
          menuIcons={menuIcons}
          error
        />
      ),

      children: [
        { index: true, element: <HomePage /> },

        {
          path: menuPaths[0], //posts
          element: <Posts/>,
          children: [
            {
              path: "create",
              element: <CreatePost />,
            },
            {
              path: "id/:id",
              children: [
                {
                  index: true,
                  element: <PostDetails />,
                },
                {
                  path: "update",
                  element: <UpdatePost />,
                },
                {
                  path: "copy",
                  element: <CopyPost />,
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
            },
            {
              path: "create",
              element: <CreateEvent />,
            },
            {
              path: "id/:id",
              id: "eventdetails",
              children: [
                {
                  index: true,
                  element: <EventDetails />,
                },
                {
                  path: "update",
                  element: <UpdateEvent />,
                },
                {
                  path: "copy",
                  element: <CopyEvent />,
                },
              ],
            },
          ],
        },

        {
          path: menuPaths[2], //ingredients
          element: <Ingredients/>,
        },
      ],
    },
  ]);

  return router;
}
