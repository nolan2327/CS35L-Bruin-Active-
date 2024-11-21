const express = require("express");
const {getAllData, findEventsByDate} = require("../Controllers/calendarController");

const router = express.Router();

router.get('/calendar', getAllData) //Adjust depending on what the actual route is
router.post("/findEventsByDate", findEventsByDate);

module.exports = router;