const express = require("express");
const {createProfile, findProfile, findProfilesByName, changeStatus, changeBio, getProfiles} = require("../Controllers/profileController");

const router = express.Router();

router.post("/createProfile", createProfile);
router.get("/findProfile", findProfile);
router.get("/find", findProfilesByName)
router.post("/changeStatus", changeStatus);
router.post("/changeBio", changeBio);
router.get("/", getProfiles);

module.exports = router;