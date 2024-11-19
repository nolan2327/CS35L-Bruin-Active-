const express = require("express");
const {createProfile, findProfile, findProfilesByName, getProfiles} = require("../Controllers/profileController");

const router = express.Router();

router.post("/createProfile", createProfile);
router.get("/findProfile", findProfile);
router.get("/find", findProfilesByName)
router.get("/", getProfiles);

module.exports = router;