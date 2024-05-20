
import { defer } from "react-router-dom";
import store from "../store/indexStore";

async function loadItems(request) {
  try {
    const state = store.getState();
    
    const relUrl = request.url.split(`${window.location.origin}/`)[1];
    const url = `${window.API_BASE_URL}${relUrl}`;

    if (!window.user)
      window.user = JSON.parse(
        sessionStorage.getItem(
          `oidc.user:${window.OIDC_AUTHORITY}:${window.OIDC_CLIENT_ID}`
        )
      );
      let access_token = state.commonStore.user?.access_token ?? "";

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
      data:null
    };
  }
}

export default function listLoader({request}) {
  return defer({
    loaderPromise: loadItems(request),
  });
}