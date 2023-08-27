import { redirect } from "react-router-dom";

export default async function eventAction({ request, params }) {
  const method = request.method;
  
  let url = '';
  if(method === "POST")
    url = `${window.API_BASE_URL}events/create`;
  else if(method === "PUT")
    url = `${window.API_BASE_URL}events/update`;
  else 
    url = `${window.API_BASE_URL}events/delete/${params.id}`;

  let body = null;
  if(method === "POST" || method === "PUT"){
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

  if(!response.ok)
    return await response.json();
  else
    return redirect("..");
}