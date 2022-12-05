import React from "react";

const Home = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Message Board</h1>
            <p className="lead">
              A message board is an online discussion area in which users with
              similar interests discuss topics. These conversations or
              discussions are available in the form of posted messages.
              Discussions are listed in a central place maintained on web pages.
              Message boards can be specialized or general, global or local,
              free or subscription-based, public or private, etc.
            </p>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src="https://is.gd/jUrEgM" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
