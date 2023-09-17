export default async function crudAction({ request }) {
  try {
    const relUrl = request.url.split(`${window.location.origin}/`)[1];
    const url = `${window.API_BASE_URL}${relUrl}`;

    if (!window.user)
      window.user = JSON.parse(
        sessionStorage.getItem(
          `oidc.user:${window.OIDC_AUTHORITY}:${window.OIDC_CLIENT_ID}`
        )
      );
    let access_token = window.user ? window.user.access_token : "";

    const formData = await request.formData();
    let objectData = Object.fromEntries(formData);
    let bodyObject = {};
    for (let prop in objectData) {
      let val = objectData[prop];
      if (val) bodyObject[prop] = val;
    }

    const response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(bodyObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${access_token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
      resultCode: "error",
      errorMessages: [""],
      data: null,
    };
  }
}
