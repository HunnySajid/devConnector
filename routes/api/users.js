const express = require("express");
const UserController = require("../../controllers/user");
const router = express.Router();

// @route POST api/users
// @desc Register User
// @access Public
router.post("/", UserController.validateBody(), UserController.registerUser);
module.exports = router;
