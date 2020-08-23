import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Login() {
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/800px-No-logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input type="email"></input>
          <h5>Password</h5>
          <input type="password"></input>
        </form>
        <div className="login__signInContainer">
          <button className="login__signIn">Sign In</button>
        </div>

        <p>
          By Signing in, you agree to "OUR NAME" condition of use. Please see
          our privacy notices, our Cookie Notices and our Data Sharing Notices.
        </p>
        <Link to="/register">
          {" "}
          <button className="login__createAccount">
            Create A Student Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
