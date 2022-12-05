import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api_uri = "http://localhost:5000/api/auth/createUser";

  const formSubmitted = async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    // console.log(data);
    setName("");
    setEmail("");
    setPassword("");

    const response = await fetch(api_uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json);
    if (response.status === 200) {
      alert("User Sign Up Success 👍");
      navigate("/signIn");
    }
    if (response.status === 422) {
      alert("User Already Exist 😠");
    }
  };
  return (
    <>
      <form
        className="mt-5 p-4 p-md-5 border rounded-3 bg-light container"
        onSubmit={formSubmitted}
      >
        <div className="fomr-label">
          <h3>Sign Up</h3>
        </div>
        <div className="form-floating mb-3">
          <input
            type="name"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
          />
          <label htmlFor="floatingInput">Name</label>
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
        <div className="mb-3">
          <label>
            <Link to="/signIn">Already User</Link>
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
