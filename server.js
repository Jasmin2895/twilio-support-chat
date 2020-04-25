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
  //       "<Response><Say>Your Call is recorded for internal purpose usage!</Say></Response>",
  //     to: "+918890378033",
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
  //TODO: Create TwiML response
  const voiceResponse = new VoiceResponse();
  voiceResponse.dial(
    {
      callerId: process.env.TWILIO_NUMBER,
    },
    request.body.number
  );

  response.type("text/xml");
  response.send(voiceResponse.toString());
});

app.listen(3001, () => {
  console.log("Programmable Chat token server listening on port 3001!");
});
