import { defer } from "react-router-dom";

async function load(request) {

  if (window.user == null) return {};

  let relUrl = request.url.split(`${window.location.origin}/`)[1];
  let url = `${window.API_BASE_URL}${relUrl}`;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${window.user.access_token}`,
    },
  });

  if (!response.ok)
    throw Error(`Http error occured: statuscode = ${response.status}`);

  const result = await response.json();

  return result.data;
}

export default function loader({request}) {
  return defer({
    data: load(request),
  });
}
