const express = require("express");
const { login, register } = require('../controllers/auth.controller.js');
const user = require("../controllers/user.controller.js");
const router = express.Router();

// api/v1/auth
router.post('/login', login);
router.post('/register', user.create);

module.exports = router;
