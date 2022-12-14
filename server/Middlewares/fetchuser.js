const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  try {
    const token = req.header("authToken");
    if (!token) {
      return res.status(422).json({
        message: "Failed to validate the token",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = fetchuser;
