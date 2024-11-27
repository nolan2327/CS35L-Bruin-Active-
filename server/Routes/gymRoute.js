const express = require("express");
const {getAllData, findGym, findTotal} = require("../Controllers/gymController");

const router = express.Router();

router.get('/', getAllData);
router.get('/', findTotal);
router.get('/:gymType', findGym);

module.exports = router;