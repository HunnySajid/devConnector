const express = require("express");
const router = express.Router();

// @route GET api/profiles
// @desc Test Route
// @access Public
router.get("/", (req, res) => {
  return res.send("Profile Route");
});

module.exports = router;
