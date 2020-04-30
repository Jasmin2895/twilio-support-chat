"use strict";

const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const Twilio = require("twilio");

const MessageSchema = new Schema({
  body: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
  time: { type: Date, index: true },
});

MessageSchema.methods.requiresNotification = function (date) {
  return (
    Math.round(
      moment
        .duration(
          moment(this.time).tz(this.timeZone).utc().diff(moment(date).utc())
        )
        .asMinutes()
    ) === this.notification
  );
};

MessageSchema.statics.sendNotifications = function (callback) {
  // now
  const searchDate = new Date();
  Messages.find().then(function (messages) {
    messages = messages.filter(function (message) {
      return message.requiresNotification(searchDate);
    });
    if (messages.length > 0) {
      sendNotifications(messages);
    }
  });

  /**
   * Send messages to all appoinment owners via Twilio
   * @param {array} appointments List of appointments.
   */

  function sendNotifications(msgs) {
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    msgs.forEach(function (msg) {
      const options = {
        to: `+ ${msg.phoneNumber}`,
        from: process.env.TWILIO_NUMBER,
        /* eslint-disable max-len */
        body: msg.body,
        /* eslint-enable max-len */
      };

      client.messages.create(options, function (err, response) {
        if (err) {
          // Just log it for now
          console.error(err);
        } else {
          let masked = msg.phoneNumber.substr(0, msg.phoneNumber.length - 5);
          masked += "*****";
        }
      });
    });

    // queued for delivery
    if (callback) {
      callback.call();
    }
  }
};

const Messages = mongoose.model("message", MessageSchema);
module.exports = Messages;
