import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Message from "./Components/Message";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import SignUp from "./Components/Forms/SignUp";
import SignIn from "./Components/Forms/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar searchBar={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/message" element={<Message />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
