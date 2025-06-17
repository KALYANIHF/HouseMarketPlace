import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ArrowIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseAppInit from "../firebase.config";

function SignIn() {
  firebaseAppInit;
  const auth = getAuth();
  const [showpassword, setShowPassWord] = useState(false);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      if (user) {
        navigate("/profile");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHader">Welcome Back!</p>
        </header>
        <form onSubmit={handleSubmit} className="signInForm">
          <input
            type="email"
            name="email"
            className="emailInput"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              className="passwordInput"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={handleChange}
            />
            <img
              className="showPassword"
              src={visibilityIcon}
              onClick={() => setShowPassWord(!showpassword)}
              alt=""
            />
          </div>
          <Link to="/forgotpassword" className="forgotPasswordLink">
            Forgot-Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowIcon fill="#fff" height="34px" width="34px" />
            </button>
          </div>
          <Link to="/signup" className="registerLink">
            Sign up Instead
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
