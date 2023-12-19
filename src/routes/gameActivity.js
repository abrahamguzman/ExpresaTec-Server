const express = require("express");
const gameActivity = require("../controllers/gameActivity.controller.js");
const router = express.Router();

// api/v1/gameActivitys
router.get("/", gameActivity.findAll);
router.get("/:id", gameActivity.findById);
router.post("/", gameActivity.create);
router.put("/:id", gameActivity.update);
router.delete("/:id", gameActivity.remove);

module.exports = router;