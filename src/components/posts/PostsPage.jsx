import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import withOutlet from "../HOCs/withOutlet";
import PostsGrid from "./PostsGrid";

const PostsPage = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="contained" onClick={() => navigate("create")}>
        New Post
      </Button>
      <PostsGrid/>
    </>
  );
};

const PostsWithOutlet = withOutlet(PostsPage);

export default PostsWithOutlet;
