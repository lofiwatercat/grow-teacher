import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import configureStore from "./store/store";
import jwtFetch from "./store/jwt"
import { logout } from "./store/reducers/session_reducer"

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.jwtFetch = jwtFetch;
  window.logout = logout;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
