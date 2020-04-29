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

// module.exports.create = function (req, res, next) {
//   console.log("req&&&&&&&&&&&&&&&&&&&&&&&&&&&", req.body);
//   let message = new messages({
//     message: "This is automated text message",
//     to: `${process.env.TWILIO_NUMBER}`,
//     from: req.body.number,
//   });

//   let msgData = {
//     message: "This is automated text message",
//     to: `${process.env.TWILIO_NUMBER}`,
//     from: req.body.number,
//   };

//   // message.save((err) => {
//   //   console.log(err);
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   res.send("Message created successfully");
//   // });

//   message.insertOne(msgData, (err, res) => {
//     if (err) throw err;

//     console.log("document inserted");
//   });
// };
