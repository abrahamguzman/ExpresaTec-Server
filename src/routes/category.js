const express = require("express");
const category = require("../controllers/category.controller.js");
const router = express.Router();

// api/v1/categorys
router.get("/", category.findAll);
router.get("/:id", category.findById);
router.post("/", category.create);
router.put("/:id", category.update);
router.delete("/:id", category.remove);

module.exports = router;