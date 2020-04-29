"use strict";

const messages = require("../models/message");

const notificationWorkerFactory = () => {
  return {
    run: () => {
      messages.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();
