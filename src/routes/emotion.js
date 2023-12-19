const express = require("express");
const emotion = require("../controllers/emotion.controller.js");
const router = express.Router();

// api/v1/emotions
router.get("/", emotion.findAll);
router.get("/:id", emotion.findById);
router.post("/", emotion.create);
router.put("/:id", emotion.update);
router.delete("/:id", emotion.remove);

module.exports = router;