export default async function eventListLoader() {
  if (window.user == null) return [];
  const response = await fetch(
    `${window.API_BASE_URL}events/author/${window.user.profile.preferred_username}`,
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
