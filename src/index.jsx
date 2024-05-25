import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import store from "./store/indexStore.js";
import { SWRConfig } from "swr";
import swrFetcher from "./services/swrFetcher.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const oidcConfig = {
  authority: window.OIDC_AUTHORITY,
  client_id: window.OIDC_CLIENT,
  redirect_uri: window.location.href,
  onSigninCallback: (_user) => {
    //window.history.replaceState({}, document.title, window.location.pathname);
    window.location.href = "/";
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider {...oidcConfig}>
        <SWRConfig
          value={{
            //refreshInterval: 3000,
            fetcher: swrFetcher,
          }}
        >
          <App />{" "}
        </SWRConfig>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
