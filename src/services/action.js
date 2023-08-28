import { redirect } from "react-router-dom";

export default async function action({ request, params }) {
  const method = request.method;

  let relUrl = request.url.split(`${window.location.origin}/`)[1];
  let url = `${window.API_BASE_URL}${relUrl}`;

  let body = null;
  if (method === "POST" || method === "PUT") {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
    body = JSON.stringify(postData);
  }

  const response = await fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${window.user.access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok || method === "GET") 
    return result;
  else if (method === "DELETE") 
    return redirect("..");
  else 
    return redirect(`/${relUrl.split("/")[0]}/id/${result.data.id}`);
}
