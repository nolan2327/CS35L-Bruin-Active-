const express = require("express");
const {findOccupancy} = require("../Controllers/gymController");

const router = express.Router();

router.get("/find/:date", findOccupancy)

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/find/:userId", findUser)
// router.get("/", getUsers);

module.exports = router;