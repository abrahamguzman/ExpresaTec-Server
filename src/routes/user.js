const express = require("express");
const user = require("../controllers/user.controller.js");
const router = express.Router();

// api/v1/users
router.get("/", user.findAll);
router.get("/:id", user.findById);
router.post("/", user.create);
router.put("/:id", user.update);
router.delete("/:id", user.remove);

module.exports = router;
