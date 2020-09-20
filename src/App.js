import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";

import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Customers from "./pages/Customers";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";
import allActions from "./store/actions";

import "./App.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token }
        });
        setUserData({
          token,
          user: userResponse.data
        });
        dispatch(allActions.userActions.setUser(userResponse.data));
        return userData;
      }
    };

    checkLoggedIn();
  }, [dispatch, userData]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/customers" component={Customers}></Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
