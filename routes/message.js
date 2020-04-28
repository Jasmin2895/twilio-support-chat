"use strict";

const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.post("/create", messageController.create);

module.exports = router;
