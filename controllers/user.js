const ERRORS = require("../constants/errors");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const validateBody = () => {
  return [
    check("name", ERRORS.NAME_EMPTY).not().isEmpty(),
    check("email", ERRORS.INVALID_EMAIL).isEmail(),
    check("password", ERRORS.PASSWORD_SHORT).isLength({
      min: 6,
    }),
  ];
};

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    console.log("user", user);
    if (user) {
      res.status(400).json({ errors: [{ msg: ERRORS.USER_EXISTS }] });
    }
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("JWT_SECRET"),
      {
        expiresIn: 3600 * 10,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = { validateBody, registerUser };
