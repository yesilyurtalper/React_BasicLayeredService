export default async function eventDetailsLoader({ params }) {
  if (window.user == null) return {};
  const response = await fetch(
    `${window.API_BASE_URL}events/id/${params.id}`,
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
