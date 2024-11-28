const express = require("express");
const {getAllData, findEventsByDate} = require("../Controllers/calendarController");

const router = express.Router();

router.get('/', getAllData) //Adjust depending on what the actual route is
router.get('/:start_date', findEventsByDate);

module.exports = router;