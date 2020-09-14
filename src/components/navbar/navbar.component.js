import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/home" className="navbar-brand">
          Home
        </Link>
        <span className="navbar-text">
          <AuthOptions />
        </span>
      </nav>
    );
  }
}
