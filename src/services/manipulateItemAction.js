import { redirect } from "react-router-dom";

export default async function manipulateItemAction({ request}) {

  let relUrl = request.url.split(`${window.location.origin}/`)[1];
  let url = `${window.API_BASE_URL}${relUrl}`;

  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  const body = JSON.stringify(postData);

  const response = await fetch(url, {
    method: request.method,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${window.user.access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) 
    return result;
  else 
    return redirect(`/${relUrl.split("/")[0]}/id/${result.data.id}`);
}
