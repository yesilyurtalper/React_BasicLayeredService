
export default async function loader({request, params}) {
  
  let relUrl = request.url.split(`${window.location.origin}/`)[1];
  let item = relUrl.split("/")[0];
  let url = `${window.API_BASE_URL}${item}`;
  if(params.id)
    url = `${url}/id/${params.id}`;
  
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
