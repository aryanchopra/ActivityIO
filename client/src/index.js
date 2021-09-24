import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ToastContainer containerId="notitoast" draggable={false} />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
