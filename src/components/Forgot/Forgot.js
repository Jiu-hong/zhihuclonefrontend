import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../action/user";

import "./Styles.css";
const Forgot = () => {
  const [userdata, setUserdata] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(null);
    setUserdata(e.target.value);
  };

  const handleForgot = async (e) => {
    e.preventDefault();

    await forgotPassword({ email: userdata }, setMessage);
  };

  return (
    <div className="cellframe singlecell">
      <div className={message ? "errorshow error" : "error"}>
        {message ? "" : "message"}
        {message && (message.error || message)}
      </div>

      <h2 className="signtitle">Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <div className="inputbox">
          <label htmlFor="email">email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            id="email"
            value={userdata}
            required
          />
        </div>

        <div className="signbtns">
          <button>submit</button>
        </div>
        <div className="inputboxforgot">
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

export default Forgot;
