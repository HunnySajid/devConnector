const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const ProfileController = require("../../controllers/profile");

// @route GET api/profile/me
// @desc Route to get loggedin user's profile
// @access Private
router.get("/me", auth, ProfileController.getUserProfile);

// @route POST api/profile
// @desc Route to create or update user's profile
// @access Private
router.post(
  "/",
  [auth, ProfileController.validateBody()],
  ProfileController.createOrUpdateProfile
);

// @route GET api/profile
// @desc Route to get all users's profiles
// @access Public
router.get("/", ProfileController.getAllProfiles);

// @route GET api/profile/user/:user_id
// @desc Route to get specific user based on id
// @access Public
router.get("/user/:user_id", ProfileController.getProfileById);

// @route DELETE api/profile
// @desc Route to get specific user based on id
// @access Public
router.delete("/", auth, ProfileController.deleteUserProfile);

module.exports = router;
