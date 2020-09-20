import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import { useSelector } from "react-redux";

export default function Navbar() {
  const currentUser = useSelector(state => state.currentUser);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/home" className="navbar-brand">
        Health Form
      </Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            {currentUser.loggedIn ? (
              <Link to="/customers" className="nav-link">
                Customers
              </Link>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
      <span className="navbar-text">
        <AuthOptions />
      </span>
    </nav>
  );
}
