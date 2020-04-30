"use strict";
const path = require("path");
const messages = require("../models/message");
const moment = require("moment");
const momentTimeZone = require("moment-timezone");

const getTimeZones = function () {
  return momentTimeZone.tz.names();
};

exports.getMessages = (req, res) => {
  messages.find({}).exec((err, messages) => {
    if (err) {
      return res.send(500, err);
    }
    console.log("message", messages);
    res.send(200, { result: messages });
  });
};

exports.createMessages = (req, res) => {
  res.send(200, {
    result: {
      msgs: new messages({
        body: "",
        phoneNumber: "",
        notification: "",
        timeZone: "",
        time: "",
      }),
      timeZones: getTimeZones(),
    },
  });
};

exports.postMessages = (req, res) => {
  console.log("####", req.body);
  const body = req.body.body;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(new Date()).add(req.body.time, "minutes");

  const Messages = new messages({
    body,
    phoneNumber,
    notification,
    timeZone,
    time,
  });

  Messages.save().then(() => {
    res.send(200, { result: "Data saved successfully" });
  });
};

exports.getOneMessage = (req, res) => {
  const id = req.params.id;
  messages.findOne({ _id: id }).then((msg) => {
    res.send(200, {
      result: {
        timeZones: getTimeZones(),
        message: msg,
      },
    });
  });
};

exports.editMessage = (req, res) => {
  const id = req.params.id;
  const body = req.body.body;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(new Date()).add(req.body.time, "minutes");

  messages.findOne({ _id: id }).then((msg) => {
    msg.body = body;
    msg.phoneNumber = phoneNumber;
    msg.notification = notification;
    msg.timeZone = timeZone;
    msg.time = time;

    msg.save().then(() => {
      res.send(200, { result: msg });
    });
  });
};

// exports.create = (req, res) => {
//   var newMsg = new messages({
//     message: "This is automated text message",
//     to: `${process.env.TWILIO_NUMBER}`,
//     from: req.body.number,
//   });

//   newMsg.save((err) => {
//     if (err) {
//       res.send(400).send("Unable to save to message database");
//     } else {
//       console.log("data saved successfully");
//     }
//   });
// };

exports.delete = (req, res, next) => {
  const id = req.params.id;
  messages.remove({ _id: id }).then(() => {
    res.send(200, { result: "Message deleted successfully" });
  });
};
