import * as React from "react";
import ReactDOM from "react-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Router from "../pages/Dashboard/Router";

ReactDOM.render(
  <React.StrictMode>
    {/* <Dashboard /> */}
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
