require("dotenv").config();

// Node/Express
const http = require("http");
const Twilio = require("twilio");
const Chance = require("chance");
const express = require("express");
const { urlencoded } = require("body-parser");
const ClientCapability = Twilio.jwt.ClientCapability;
const VoiceResponse = Twilio.twiml.VoiceResponse;

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(urlencoded({ extended: false }));

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
  // const client = require("twilio")(
  //   process.env.TWILIO_ACCOUNT_SID,
  //   process.env.TWILIO_AUTH_TOKEN
  // );
  // client.calls
  //   .create({
  //     twiml:
  //       "<Response><Say>What's up Supreet, I've got your number from your friend. How are you doing! You've got talented and beautiful sisters. Your are soooooo lucky to have them! You are sooo handsome. How is your Love Life going on? Are ypou seeing someone special?</Say></Response>",
  //     to: "+353899419815",
  //     from: process.env.TWILIO_NUMBER,
  //   })
  //   .then((call) => console.log(call));

  const tokenCall = capability.toJwt();
  console.log("tokenCall", tokenCall);

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
  console.log("request", request.body.number);
  //TODO: Create TwiML response
  const voiceResponse = new VoiceResponse();
  const dial = voiceResponse.dial({
    callerId: process.env.TWILIO_NUMBER,
  });
  dial.number(request.body.number);

  console.log("response", voiceResponse);
  response.type("text/xml");
  response.send(voiceResponse.toString());
});

app.post("/call", (request, response) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = Twilio(accountSid, authToken);
  client.calls
    .create({
      method: "GET",
      sendDigits: "1234#",
      record: true,
      twiml: "<Response><Say>Hi my Name is Jasmin!</Say></Response>",
      to: request.body.number,
      from: process.env.TWILIO_NUMBER,
    })
    .then((call) => {
      client
        .calls(call.sid)
        .update({ twiml: "<Response><Say>Ahoy there</Say></Response>" })
        .then((call) => console.log(call.to));
    });

  // client.calls.update({});
});

app.listen(3001, () => {
  console.log("Programmable Chat token server listening on port 3001!");
});
