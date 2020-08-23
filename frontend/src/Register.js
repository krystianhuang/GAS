import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <Link to="/">
        <img
          className="register__image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/800px-No-logo.svg.png"
          alt=""
        />
      </Link>

      <div className="register__container">
        <h1>Sign Up</h1>
        <form>
          <h5>Student ID</h5>
          <input type="number"></input>
          <h5>E-mail</h5>
          <input type="email"></input>
          <h5>Password</h5>
          <input type="password"></input>
        </form>
        <div className="register__registerContainer">
          <button className="register__registerAcc">Create Account</button>
        </div>
        <div className="register__disclaimer">
          <label>
            <input type="checkbox" />
            <span>
              I Agree to "Name" Terms of Use and Cookie & Privacy Policy.
            </span>
          </label>
        </div>

        <Link to="login">
          <button className="register__signIn">
            Already have an Account? Sign In.
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
