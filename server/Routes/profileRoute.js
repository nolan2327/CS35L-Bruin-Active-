const express = require("express");
const {createProfile, findProfile, findProfilesByName, changeStatus, changeBio, getProfiles} = require("../Controllers/profileController");

const router = express.Router();

router.post("/createProfile", createProfile);
router.post("/findProfile", findProfile);
router.post("/findProfilesByName", findProfilesByName)
router.post("/changeStatus", changeStatus);
router.post("/changeBio", changeBio);
router.get("/", getProfiles);

module.exports = router;