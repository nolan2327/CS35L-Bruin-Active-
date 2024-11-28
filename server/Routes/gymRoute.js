const express = require("express");
const {getAllData, findGym, findTotal} = require("../Controllers/gymController");

const router = express.Router();

router.get('/', getAllData);
router.get('/:gymName', findGym);

module.exports = router;