import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ArrowIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import firebaseAppInit from "../firebase.config";
function SignUp() {
  firebaseAppInit;
  const auth = getAuth();

  const [showpassword, setShowPassWord] = useState(false);
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUser.user;

      updateProfile(auth.currentUser, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate("/");
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
            type="text"
            name="name"
            className="nameInput"
            placeholder="username"
            autoComplete="username"
            value={name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="emailInput"
            placeholder="Email"
            autoComplete="useremail"
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowIcon fill="#fff" height="34px" width="34px" />
            </button>
          </div>
          <Link to="/signin" className="registerLink">
            Already Registered ? Sign in
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
