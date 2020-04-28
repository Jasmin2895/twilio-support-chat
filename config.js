"use strict";

require("dotenv-safe").load();

const cfg = {};

cfg.port = process.env.PORT || 3000;

cfg.secret = process.env.APP_SECRET || "keyboard cat";

cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

cfg.twilioPhoneNumber = process.env.TWILIO_NUMBER;

cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGO_URL;
cfg.mongoUrlTest = process.env.MONGO_URL_TEST;

// Export configuration object
module.exports = cfg;
