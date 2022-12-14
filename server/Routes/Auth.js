const express = require("express");
const router = express.Router();
const UserSchema = require("../Models/User");
const db = require("../db");
const User = db.get("users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../Middlewares/fetchuser");

// ROUTE 1 : Create User
router.post("/signUp", async (req, res) => {
  try {
    // validate the body
    const user = await UserSchema.validateAsync(req.body);
    if (user) {
      // check is email already exist
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(422).json({
          message: "Try to Sign with valid credentails email already exist",
        });
      }
      //   hash the password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;
      // insert to DB
      user.created_on = new Date().toLocaleString();
      const created = await User.insert(user);

      // create jwt
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(201).json({
        message: "User Created",
        // data: created,
        token: authToken,
      });
    }
    return res.status(422).json({
      message: "Try to sing with valid credentails",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Rotue 2 : Login User
router.post("/signIn", async (req, res) => {
  try {
    // find the user
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);
      if (!isValidKey) {
        return res.status(422).json({
          message: "Try to Login with valid credentails invalid password ",
        });
      }
      // create jwt
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(201).json({
        message: "User logged in Success",
        // data: user,
        token: authToken,
      });
    }
    return res.status(404).json({
      message: "Try to sing with valid credentails",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Rotue 3: fetch user profile
router.get("/profile", fetchuser, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
