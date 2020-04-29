"use strict";

const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.post("/create", (req, res) => {
  messageController.create(req, res);
});

router.get("/get", (req, res) => {
  messageController.find(req, res);
});
module.exports = router;
