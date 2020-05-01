import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CurrentAppProvider } from "./components/contexts/Trails.context";
ReactDOM.render(
  <React.StrictMode>
    <CurrentAppProvider>
      <App />
    </CurrentAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
