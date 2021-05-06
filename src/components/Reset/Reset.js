import React, { useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../action/user";
import { userglobalContext } from "../../context/Provider/UserProvider";

import "./Styles.css";

const Reset = () => {
  const { randamtoken } = useParams();

  const [userdata, setUserdata] = useState({
    randamtoken,
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const { userdispatch } = useContext(userglobalContext);

  const history = useHistory();

  const handleChange = (e) => {
    setMessage(null);
    setUserdata((prevUserdata) => ({
      ...prevUserdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const result = await resetPassword(userdata, userdispatch, setMessage);

    if (result) history.push("/");
  };
  return (
    <div className="cellframe singlecell">
      <div className={message ? "errorshow error" : "error"}>
        message: {message && (message.error || message)}
      </div>

      <h2 className="signtitle">Reset Password</h2>
      <form onSubmit={handleReset}>
        <div className="inputbox">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            name="email"
            value={userdata["email"]}
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="password">password </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            name="password"
            value={userdata["password"]}
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="confirmPassword">confirmpassword </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            name="confirmPassword"
            value={userdata["confirmPassword"]}
            required
          />
        </div>

        <div className="signbtns">
          <button>submit</button>
        </div>
        <div className="inputbox reset">
          <Link to="/signup" className="sqlink">
            <span className="switch">signup</span>
          </Link>
          <Link to="/login" className="sqlink">
            <span className="switch">login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
