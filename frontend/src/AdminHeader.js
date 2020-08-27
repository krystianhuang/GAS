import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

// This is the header component that will go on most pages
// Logo on the left
// Page Navigation Links
// Pages:
// Home, Login, Register, Dashboard, About, Help

function AdminHeader() {
  return (
    <nav className="header">
      <div className="header__logo">
        {" "}
        <Link to="/">
          <img
            className="header__image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/800px-No-logo.svg.png"
            alt=""
          />
        </Link>
      </div>

      <div className="header__nav">
        <Link to="/loginpage" className="header__link">
          <div className="header__option">
            <span className="header_optionLineOne">Hello, Admin</span>
            <span className="header_optionLineTwo">Sign out</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header_optionLineOne">Admin</span>
            <span className="header_optionLineTwo">Settings</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header_optionLineOne">Admin</span>
            <span className="header_optionLineTwo">Dashboard</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header_optionLineOne">Your</span>

            <span className="header_optionLineTwo">FAQ</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header_optionLineOne">Need Help?</span>
            <span className="header_optionLineTwo">Contact Us</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default AdminHeader;
