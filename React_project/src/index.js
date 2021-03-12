import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="polinakaryzhska.us.auth0.com"
    clientId="EQR0m5bfhRTkhN071nXZhFRYvfN86jyI"
    redirectUri="http://localhost:3000/"
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
  ,
  document.getElementById("root")
);



