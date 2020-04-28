"use strict";

const messages = require("../models/message");

module.exports.create = function (req, res, next) {
  console.log("req&&&&&&&&&&&&&&&&&&&&&&&&&&&", req.body);
  let message = new messages({
    message: "This is automated text message",
    to: `${process.env.TWILIO_NUMBER}`,
    from: req.body.number,
  });

  message.save((err) => {
    console.log(err);
    if (err) {
      return next(err);
    }
    res.send("Message created successfully");
  });
};
