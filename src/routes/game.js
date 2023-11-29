const express = require("express");
const game = require("../controllers/game.controller.js");
const router = express.Router();

// api/v1/games
router.get("/", game.findAll);
router.get("/:id", game.findById);
router.post("/", game.create);
router.put("/:id", game.update);
router.delete("/:id", game.remove);

module.exports = router;
