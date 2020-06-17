const { check, validationResult } = require("express-validator");

const validateBody = () => {
  return [
    check("name", "Name must not be empty").not().isEmpty(),
    check("email", "Must be a valid email").isEmail(),
    check("password", "Password must be 6 char or more").isLength({
      min: 6,
    }),
  ];
};
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.send("User Route");
};
module.exports = { validateBody, registerUser };
