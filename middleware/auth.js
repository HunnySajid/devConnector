const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  try {
    const decode = jwt.verify(token, config.get("JWT_SECRET"));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
