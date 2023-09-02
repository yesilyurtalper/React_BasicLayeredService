import { redirect } from "react-router-dom";

export default async function deleteItemAction({ request }) {
  
  let relUrl = request.url.split(`${window.location.origin}/`)[1];
  let url = `${window.API_BASE_URL}${relUrl}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${window.user.access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) 
    return result;
  else
    return redirect("..");
}
