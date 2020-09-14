import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [displayName, setdisplayName] = useState();
  const [password, setpassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, displayName, password, passwordCheck };
    await Axios.post("http://localhost:5000/users/register", newUser);
    const loginResponse = await Axios.post(
      "http://localhost:5000/users/login",
      { email, password }
    );
    setUserData({
      token: loginResponse.data.token,
      user: loginResponse.data.user
    });
    localStorage.setItem("auth-token", loginResponse.data.token);
    history.push("/");
  };
  return (
    <div className="container mt-5">
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="inputEmail1">Email address</label>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputDisplayName">Display Name</label>
          <input
            onChange={e => setdisplayName(e.target.value)}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={e => setpassword(e.target.value)}
            type="password"
            className="form-control"
            id="inputPassword"
            autoComplete="on"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputConfirmPassword">Confirm Password</label>
          <input
            onChange={e => setPasswordCheck(e.target.value)}
            type="password"
            className="form-control"
            id="inputConfirmPassword"
            autoComplete="on"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
