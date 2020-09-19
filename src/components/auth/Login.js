import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../error/ErrorNotice";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.error && setError(err.response.data.error);
    }
  };
  return (
    <div className="container mt-5">
      <h3>Login</h3>
      {error && (
        <ErrorNotice
          messageError={error}
          clearError={() => setError(undefined)}
        />
      )}
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={e => setpassword(e.target.value)}
            type="password"
            className="form-control"
            autoComplete="on"
            id="inputPassword"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
