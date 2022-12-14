import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SIGN_In_API = "http://localhost:5000/api/v1/signIn";

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        email,
        password,
      };

      console.log(data);
      const response = await fetch(SIGN_In_API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 422) {
        alert("Try to Sign with valid credentails invalid password");
      }
      if (response.status === 404) {
        alert("Try to login with valid credentails email not found");
      }
      if (response.status === 201) {
        alert("User Logged In");
        const { token } = json;
        navigate("/message");
        localStorage.setItem("token", token);
        // localStorage
        // console.log(token);
      }
    },
    [email, password]
  );

  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
      >
        <div className="form-label">
          <h3>Sign In</h3>
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
            id="pasword"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link className="cursor-pointer" role="button" to={"/"}>
              New User
            </Link>
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign In
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignIn;
