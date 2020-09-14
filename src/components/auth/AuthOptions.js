import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      {userData.user ? (
        <button
          onClick={logout}
          className="btn btn-outline-danger my-2 my-sm-0 mx-4"
        >
          Log out
        </button>
      ) : (
        <div>
          <button
            onClick={register}
            className="btn btn-outline-info my-2 my-sm-0 mx-4"
          >
            Register
          </button>
          <button
            onClick={login}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
