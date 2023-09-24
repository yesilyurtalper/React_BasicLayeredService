export default async function itemLoader({ request,params }) {
  try {
    const relUrl = request.url.split(`${window.location.origin}/`)[1];
    const item = relUrl.split("/")[0]
    const url = `${window.API_BASE_URL}${item}/id/${params.id}`;

    if (!window.user)
      window.user = JSON.parse(
        sessionStorage.getItem(
          `oidc.user:${window.OIDC_AUTHORITY}:${window.OIDC_CLIENT_ID}`
        )
      );
    let access_token = window.user ? window.user.access_token : "";

    const response = await fetch(url, {
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
