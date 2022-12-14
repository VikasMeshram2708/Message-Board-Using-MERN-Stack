import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);

  const formSubmitted = (event) => {
    event.preventDefault();
    // console.log(message);
    setMessage("");
  };

  const AddMessage = () => {
    console.log(message);
    setNewMessage([
      ...newMessage,
      {
        id: message.length + Math.random(),
        content: message,
      },
    ]);
    // console.log(newMessage);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <form onSubmit={formSubmitted} className="container mt-5">
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            <h3>Enter a Message</h3>
          </label>
          <input
            type="text"
            placeholder="e.g what's up bro..."
            className="form-control"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-outline-secondary w-100"
          type="submit"
          onClick={AddMessage}
        >
          Send Message
        </button>

        <ul className="mt-5 fs-5">
          {newMessage.map((items) => {
            return <li key={items.id}>{items.content}</li>;
          })}
        </ul>
      </form>
    </>
  );
};

export default Message;
