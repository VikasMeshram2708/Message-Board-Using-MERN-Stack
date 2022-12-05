const express = require("express");
const router = express.Router();
const db = require("../DB/Connection");
const User = db.get("users");
const Schema = require("../DB/Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../Middlewares/fetchuser");

// Route 1 : Create user using POST : "/api/auth/createUser"
router.post("/createUser", async (req, res, next) => {
  try {
    // validate the body
    const user = await Schema.validateAsync(req.body);
    if (user) {
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(422).json({
          message: "User Already Exist 😠",
        });
      }
      //   hash the password
      //   const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, 10);
      user.password = secpass;
      // insert to DB
      user.created_on = new Date().toLocaleString();
      const created = await User.insert(user);
      return res.json(created);
    }
    return res.status(422).json({
      message: "Invalid Credentials try to sign in with proper credentials",
    });
  } catch (error) {
    next(error.message);
  }
});

// Route 2 : User login using POST : "/api/auth/userLogin"
router.post("/userLogin", async (req, res, next) => {
  try {
    // validate the body
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);

      if (!isValidKey) {
        return res.status(404).json({
          message:
            "Invaild Credentials try to login with correct credentials 😠",
        });
      }
      // jwt sign
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // res.isu
      return res.status(200).json({
        message: "User Logged In Sucess 🍰",
        token: authToken,
      });
    }
    return res.status(422).json({
      message: "Invalid Credentials try to sign in with proper credentials",
    });
  } catch (error) {
    next(error.message);
  }
});

// Route 3 : fetch the user
router.get("/getUser", fetchuser, async (req, res, next) => {
  try {
    const value = await User.findOne({
      _id: req.user._id,
    });
    return res.json(value);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
