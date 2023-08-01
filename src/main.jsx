import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import RouteUrl from "./Routes/RouteUrl";
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <Provider store={store}>
    <RouteUrl />
  </Provider>
 //</React.StrictMode>,
);
