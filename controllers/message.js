"use strict";
const path = require("path");
const messages = require("../models/message");

exports.create = (req, res) => {
  var newMsg = new messages({
    message: "This is automated text message",
    to: `${process.env.TWILIO_NUMBER}`,
    from: req.body.number,
  });

  newMsg.save((err) => {
    if (err) {
      res.send(400).send("Unable to save to message database");
    } else {
      console.log("data saved successfully");
    }
  });
};

exports.find = (req, res) => {
  messages.find({}).exec((err, message) => {
    if (err) {
      return res.send(500, err);
    }
    console.log("message", message);
    res.send(message);
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  messages.remove({ _id: id }).then(() => {
    res.send({ result: "Message deleted successfully" });
  });
};
