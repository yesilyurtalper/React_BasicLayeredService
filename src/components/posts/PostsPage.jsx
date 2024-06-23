import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import withOutlet from "../HOCs/withOutlet";
import PostListWithSWR from "./PostList";

const Posts = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="contained" onClick={() => navigate("create")}>
        New Post
      </Button>
      <PostListWithSWR/>
    </>
  );
};

const PostsWithOutlet = withOutlet(Posts);

export default PostsWithOutlet;
