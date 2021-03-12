import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogoutLink = () => {
  const { logout } = useAuth0();
  
  function handleClick() {
    localStorage.clear();
    logout({ returnTo: "http://localhost:3000" });
  }

  return [
    <li key="1" className="header__menu_link">
        <Link to="/profile" className="header__link">
            Profile
        </Link>
    </li>,
     <li key="2" className="header__menu_link">
        <a onClick={handleClick} className="header__link">
            Log Out
        </a>
    </li>
  ];
};

export default LogoutLink;