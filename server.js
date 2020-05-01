require("dotenv").config();

// Node/Express
const Twilio = require("twilio");
const Chance = require("chance");
const express = require("express");
const { urlencoded } = require("body-parser");
const ClientCapability = Twilio.jwt.ClientCapability;
const VoiceResponse = Twilio.twiml.VoiceResponse;
const message = require("./routes/message");
const db = require("./db");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(urlencoded({ extended: false }));
app.use("/messages", message);

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chance = new Chance();

app.get("/token", (req, res) => {
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  const capability = new ClientCapability({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  });

  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: process.env.TWILIO_TWIML_APP_SID,
    })
  );

  const tokenCall = capability.toJwt();

  token.identity = chance.name();
  token.addGrant(
    new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    })
  );

  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
    tokenCall: tokenCall,
  });
});

app.post("/voice", (request, response) => {
  //TODO: Create TwiML response
  const voiceResponse = new VoiceResponse();
  const dial = voiceResponse.dial({
    callerId: process.env.TWILIO_NUMBER,
  });
  dial.number(request.body.number);

  response.type("text/xml");
  response.send(voiceResponse.toString());
});

app.post("/call", (request, response) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let voiceResponse = new VoiceResponse();
  const client = Twilio(accountSid, authToken);
  client.calls
    .create({
      method: "GET",
      record: true,
      twiml:
        "<Response><Gather input='speech' enhanced='true' timeout='60' speechModel='phone_call' method='/completed'><Say>Please tell us how we can help you today. This call will be recorded for better service!</Say></Gather></Response>",
      to: request.body.number,
      from: process.env.TWILIO_NUMBER,
    })
    .then((call) => {
      response.type("text/xml");
      response.send({ result: "Call successfully placed!" });
    });
});

app.get("/completed", (request, response) => {
  response.send("Call Completed!");
});

app.post("/sms", (request, response) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = Twilio(accountSid, authToken);
  client.messages
    .create({
      to: request.body.number,
      body:
        "Hi!, Thanks for opting our SMS service, you will be recieving all updates via SMS.",
      from: process.env.TWILIO_NUMBER,
    })
    .then((message) => response.send(message.sid));
});

app.listen(3002, () => {
  console.log("Programmable Chat token server listening on port 3002!");
});
