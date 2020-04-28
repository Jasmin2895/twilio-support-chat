"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  message: { type: String, required: true },
  from: String,
  to: String,
  notification: Number,
  timeZone: String,
  time: { type: Date, index: true },
});

module.exports = mongoose.model("message", MessageSchema);
