import React from "react";
import ReactDOM from "react-dom/client";

import { CookiesProvider } from 'react-cookie';
import store from "./redux/config/configStore";
import App from "./App";
import { Provider } from "react-redux";

// import store from "./redux/config/configStore";
// import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
