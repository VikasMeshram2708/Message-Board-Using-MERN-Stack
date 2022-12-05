import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api_uri = "http://localhost:5000/api/auth/userLogin";

  const formSubmitted = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    // console.log(data);
    setEmail("");
    setPassword("");

    const response = await fetch(api_uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "token":response
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json);

    const { token } = json;
    // console.log(token);
    if (response.status === 200) {
      alert("User Sign In Success 👍");
      localStorage.setItem("token", token);
      navigate("/message");
      // navigate("/dashboard");
    }
    if (response.status === 404) {
      alert("Try to login with valid credentials 😠");
    }
    if (response.status === 422) {
      alert("User Doesn't Exist 😠");
      navigate("/signUp");
    }
  };
  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="mt-5 p-4 p-md-5 border rounded-3 bg-light container"
      >
        <div className="form-lable">
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
            <Link to="/signUp">Not a User</Link>
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignIn;
