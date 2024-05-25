import HomePage from "../components/common/layout/HomePage.jsx";
import MiniVariantDrawerWithHeader from "../components/common/layout/MiniVariantLeftDrawer";

//menu icons
import PostsIcon from "@mui/icons-material/PostAdd.js";
import EventsIcon from "@mui/icons-material/Event.js";
import IngredientsIcon from "@mui/icons-material/Settings.js";

//route components
import PostsLayout from "../components/posts/PostsLayout";
import PostList from "../components/posts/PostList";
import CreatePost from "../components/posts/CreatePost.jsx";
import PostDetails from "../components/posts/PostDetails";
import UpdatePost from "../components/posts/UpdatePost.jsx";
import CopyPost from "../components/posts/CopyPost";

//route events
import EventsPage from "../components/events/EventsPage.jsx";
import CreateEvent from "../components/events/CreateEvent.jsx";
import EventDetails from "../components/events/EventDetails";
import UpdateEvent from "../components/events/UpdateEvent.jsx";
import CopyEvent from "../components/events/CopyEvent";

import Ingredients from "../components/ingredients/Ingredients.jsx";

//loaders and actions
//import listLoader from "../services/listLoader.js";
//import itemLoader from "../services/itemLoader.js";
import crudAction from "../services/crudAction.js";

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
          element: <PostsLayout/>,
          children: [
            { index: true, element: <PostList /> },
            {
              path: "create",
              element: <CreatePost />,
              action: crudAction,
            },
            {
              path: "id/:id",
              id: "postdetails",
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
          element: <Ingredients/>,
        },
      ],
    },
  ]);

  return router;
}
