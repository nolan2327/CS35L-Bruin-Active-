const express = require("express");
const {getAllData, findGym} = require("../Controllers/gymController");

const router = express.Router();

router.get('/', getAllData)
router.get('/:gymType', findGym);

module.exports = router;