import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginLink = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  function handleClick() {
    loginWithRedirect();
  }

  return (
    <li className="header__menu_link">
      <a onClick={handleClick} className="header__link">Log In</a>
    </li>
  );
};

export default LoginLink;