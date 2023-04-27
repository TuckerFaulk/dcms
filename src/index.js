import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { CurrentProfileProvider } from "./contexts/CurrentProfileContext";

ReactDOM.render(
    <Router>
      <CurrentUserProvider>
        <CurrentProfileProvider>
          <App />
        </CurrentProfileProvider>
      </CurrentUserProvider>
    </Router>,
  document.getElementById("root")
);

reportWebVitals();
