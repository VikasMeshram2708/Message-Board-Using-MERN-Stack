import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  // const userId = localStorage.getItem("id");
  //   !userId?return on specific navlinks : return all nav links
  return (
    <>
      <nav className="p-3 navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Message Board
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/message">
                  Message Center
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <button
                  className="btn btn-primary mx-2"
                  to="/signUp"
                  type="button"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-danger"
                  to="/signIn"
                  type="button"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  Sign In
                </button>
              </form>
            ) : (
              <button
                type="button                                                                                                                                                                                                                                                                                                                                                                                                  "
                className="btn btn-danger fs-5"
                onClick={handleUser}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
