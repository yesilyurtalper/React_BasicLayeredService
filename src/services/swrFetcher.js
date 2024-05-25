import store from "../store/indexStore";

export default async function swrFetcher(relUrl) {
  let access_token = store.getState()?.commonStore?.user?.access_token;
  if (!access_token) throw new Error("no access_token found!");

  const url = `${window.API_BASE_URL}${relUrl}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${access_token}`,
    },
  });

  let result = await response.json();
  if (result?.isSuccess) return result.data;
  else throw result;
}

//const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
//fetchWithUser(api, user)
