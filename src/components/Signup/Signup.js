import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../../action/user";

import { errorglobalContext } from "../../context/Provider/ErrorProvider";
import { userglobalContext } from "../../context/Provider/UserProvider";
import { useHistory } from "react-router-dom";

import "./Styles.css";

const Signup = () => {
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
    confirmpassword: "",
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

    console.log("userdata:", userdata);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await signupUser(userdata, userdispatch, setErrMessage);

    if (result) history.push("/");
  };

  return (
    <div className="cellframe singlecell">
      <div className={errMessage ? "errorshow error" : "error"}>
        message:
        {errMessage && errMessage.error}{" "}
      </div>

      <h2 className="signtitle">signup</h2>
      <form onSubmit={handleSignup}>
        <div className="inputbox">
          <label htmlFor="firstname">firstname </label>
          <input
            type="text"
            id="firstname"
            onChange={handleChange}
            name="firstname"
            value={userdata["firstname"]}
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="lastname">lastname </label>
          <input
            type="text"
            id="lastname"
            onChange={handleChange}
            name="lastname"
            value={userdata["lastname"]}
            required
          />
        </div>
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
          <label htmlFor="confirmpassword">confirmpassword </label>
          <input
            type="password"
            id="confirmpassword"
            onChange={handleChange}
            name="confirmpassword"
            value={userdata["confirmpassword"]}
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="description">description </label>
          <textarea
            id="description"
            onChange={handleChange}
            name="description"
            rows="5"
            placeholder="optional"
            value={userdata["description"]}
          />
        </div>
        <div className="signbtns">
          <button>submit</button>
        </div>

        <div className="inputbox ">
          <div>
            Already have account?
            <Link to="/login" className="sqlink">
              <span className="switch">signin</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
