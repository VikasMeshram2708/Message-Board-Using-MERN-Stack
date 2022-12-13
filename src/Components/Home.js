import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate("");
  return (
    <div className="container">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 ">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://is.gd/YTb8mX"
            className="d-block mx-lg-auto img-fluid rounded"
            alt="Bootstrap Themes"
            loading="lazy"
            width="700"
            height="500"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">{props.title}</h1>
          <p className="lead">{props.description}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
              onClick={() => navigate("/signUp")}
            >
              {props.btnTitle}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={() => navigate("/signIn")}
            >
              {props.btnTitle2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.defaultProps = {
  title: "Message Board 📓",
  description:
    'A discussion board (known also by various other names such as discussion group, discussion forum, message board, and online forum) is a general term for any online "bulletin board" where you can leave and expect to see responses to messages you have left.',
  btnTitle: "Sign Up",
  btnTitle2: "Sign In",
};

export default Home;
