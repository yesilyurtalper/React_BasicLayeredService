import store from "../store/indexStore";

export default async function swrFetcher(relUrl) {
  try {
    let access_token = store.getState()?.commonStore?.access_token;
    if (!access_token) throw new Error("no access_token found!");

    const url = `${window.API_BASE_URL}${relUrl}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${access_token}`,
      },
    });

    let data = await response.json();
    if (response.ok) return data;
    else throw data;
  } catch (error) {
    let err = {
      message: error.message,
      resultCode: "",
      errorMessages: [error.message],
    };
    throw err;
  }
}

//const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
//fetchWithUser(api, user)
