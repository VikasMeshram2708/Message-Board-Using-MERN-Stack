const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(422).json({
        message: "Failed to authenticate the user ❎",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = fetchuser;
