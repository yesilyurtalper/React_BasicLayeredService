import { redirect } from "react-router-dom";

export default async function eventQueryAction({ request, params }) {
  const relUrl = request.url.split(`${window.location.origin}/`)[1];
  const url = `${window.API_BASE_URL}${relUrl}`;

  const formData = await request.formData();
  let objectData = Object.fromEntries(formData);
  let bodyObject = {};
  for(let prop in objectData){
    let val = objectData[prop];
    if(val)
      bodyObject[prop] = val;
  }
  
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(bodyObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${window.user.access_token}`,
    },
  });

  const result = await response.json();
  return result;
}
