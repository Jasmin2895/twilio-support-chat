"use strict";

const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.get("/", (req, res) => {
  messageController.getMessages(req, res);
});

router.get("/create", (req, res) => {
  messageController.createMessages(req, res);
});

router.post("/", (req, res) => {
  messageController.postMessages(req, res);
});

router.get("/:id/edit", (req, res) => {
  messageController.getOneMessage(req, res);
});

router.post("/:id/edit", (req, res) => {
  messageController.editMessage(req, res);
});

router.post("/:id/delete", (req, res) => {
  messageController.delete(req, res);
});
module.exports = router;
