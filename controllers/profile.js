const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const user = require("./user");

const validateBody = () => {
  return [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are required").not().isEmpty(),
  ];
};

const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
    tiktok,
  } = req.body;
  const profileFields = {};

  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (bio) profileFields.bio = bio;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (tiktok) profileFields.social.tiktok = tiktok;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //  Update if already exist
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //Create if does not exist
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Servor Error");
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile no found" });
    }
    res.status(500).send("Server Error");
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    // @todo - remove user posts

    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  validateBody,
  getUserProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileById,
  deleteUserProfile,
};
