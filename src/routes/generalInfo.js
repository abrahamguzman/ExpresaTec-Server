const express = require("express");
const generalInfo = require("../controllers/generalInfo.controller.js");
const router = express.Router();

// api/v1/games
router.get("/:id", generalInfo.findById);

module.exports = router;
