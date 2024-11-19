const express = require("express");
const {findOccupancy} = require("../Controllers/gymController");

const router = express.Router();

router.get("/find/:date", findOccupancy);

module.exports = router;