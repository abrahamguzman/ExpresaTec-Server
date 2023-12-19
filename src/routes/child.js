const express = require("express");
const child = require("../controllers/child.controller.js");
const router = express.Router();

// api/v1/childs
router.get("/", child.findAll);
router.get("/:id", child.findById);
router.post("/", child.create);
router.put("/:id", child.update);
router.delete("/:id", child.remove);

module.exports = router;