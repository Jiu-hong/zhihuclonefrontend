import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signinUser } from "../../action/user";

import { errorglobalContext } from "../../context/Provider/ErrorProvider";
import { userglobalContext } from "../../context/Provider/UserProvider";
import { useHistory } from "react-router-dom";

import "./Styles.css";
const Login = () => {
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    description: "",
  });

  const { setErrMessage, errMessage } = useContext(errorglobalContext);

  const { userdispatch } = useContext(userglobalContext);

  const history = useHistory();

  const handleChange = (e) => {
    setErrMessage(null);
    setUserdata((prevUserdata) => ({
      ...prevUserdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signinUser(userdata, userdispatch, setErrMessage);

    if (result) history.push("/");
  };

  return (
    <div className="cellframe singlecell">
      <div className={errMessage ? "errorshow error" : "error"}>
        message:
        {errMessage && errMessage.error}{" "}
      </div>

      <h2 className="signtitle">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="inputbox">
          <label htmlFor="email">email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            id="email"
            value={userdata["email"]}
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="password">password </label>
          <input
            type="password"
            onChange={handleChange}
            id="password"
            name="password"
            value={userdata["password"]}
            required
          />
        </div>
        <div className="signbtns">
          <button>submit</button>
          <Link to="/forgot" className="sqlink">
            <span className="switch">forgot password</span>
          </Link>
        </div>
        <div className="inputbox">
          <div>
            Don't have an account?{" "}
            <Link to="/signup" className="sqlink">
              <span className="switch">signup</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
