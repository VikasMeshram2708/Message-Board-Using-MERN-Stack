import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  //   validate the user
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const formSubmitted = (event) => {
    event.preventDefault();
    console.log("done");
    const data = {
      name,
      message,
    };

    console.log(data);
    setMessage("");
    setName("");
  };

  return (
    <>
      <form className="container mt-3" onSubmit={formSubmitted}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            minLength={2}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              //   console.log(event.target.value);
            }}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <input
            type="text"
            className="form-control"
            id="message"
            minLength={5}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              //   console.log(event.target.value);
            }}
            aria-describedby="emailHelp"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary fs-5 mx-2">
          Send
        </button>
      </form>
    </>
  );
};

export default Message;
