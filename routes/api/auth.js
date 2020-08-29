const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const AuthController = require("../../controllers/auth");
// @route GET api/auth
// @desc Token Route
// @access Public
router.get("/", auth, AuthController.authUser);

// @route POST api/auth
// @desc LOGIN Route
// @access Public
router.post("/", AuthController.validateBody(), AuthController.checkAuthUser);

module.exports = router;
