const express = require("express");
const {findDatesByDate} = require("../Controllers/calendarController");

const router = express.Router();

router.post("/findDatesByDate", findDatesByDate);

module.exports = router;