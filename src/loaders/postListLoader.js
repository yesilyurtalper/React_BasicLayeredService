
import { defer } from "react-router-dom";

async function loadCurrentPosts () {
  if (window.user == null) return [];
  
  const response = await fetch(
    `${window.API_BASE_URL}posts/latest/10`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${window.user.access_token}`,
      },
    }
  );

  if (!response.ok)
    throw Error(`Http error occured: statuscode = ${response.status}`);

  const result = await response.json();

  return result.data;
}

export default function postListLoader() {
  return defer({
    posts: loadCurrentPosts(),
  });
}
