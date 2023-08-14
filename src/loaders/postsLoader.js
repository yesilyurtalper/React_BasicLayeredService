export async function postsLoader() {
  console.log("postsloader called")
  /* fetch(
    `${window.API_BASE_URL}posts/author/${window.user.profile.preferred_username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${window.user.access_token}`,
      },
    }
  )
    .then((response) => {
      if (!response.status.ok)
        throw Error(`Http error occured: statuscode = ${response.status}`);
      return response.json();
    })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw Error(error);
    }); */

  try {
    const response = await fetch(
      `${window.API_BASE_URL}posts/author/${window.user.profile.preferred_username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${window.user.access_token}`,
        },
      }
    );

    if (!response.status.ok)
      throw Error(`Http error occured: statuscode = ${response.status}`);

    const result = await response.json();

    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}
