const express = require("express");
const {findEventsByDate} = require("../Controllers/calendarController");

const router = express.Router();

router.post("/findEventsByDate", findEventsByDate);

module.exports = router;