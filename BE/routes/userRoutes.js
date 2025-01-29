const express = require("express");
const { loginOrRegisterUser } = require("../controller/user.controller");

const router = express.Router();

router.post("/login", loginOrRegisterUser);

module.exports = router;
