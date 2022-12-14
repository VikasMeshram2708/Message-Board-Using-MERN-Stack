import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SIGN_UP_API = "http://localhost:5000/api/v1/signUp";
  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
      const response = await fetch(SIGN_UP_API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 422) {
        alert("Try to Sign with valid credentails email already exist");
      }
      if (response.status === 500) {
        alert("Email must be a valid email");
      }
      if (response.status === 201) {
        alert("User Created");
        navigate("/signIn");
      }
    },
    [name, email, password]
  );

  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
      >
        <div className="form-label">
          <h3>Sign Up</h3>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
          />
          <label htmlFor="floatingInput">Name </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className=" mb-3">
          <label>
            <Link className="cursor-pointer" role="button" to={"/"}>
              Already a User
            </Link>
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;
