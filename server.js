require("dotenv").config();

// Node/Express
const http = require("http");
const mongoose = require("mongoose");
const Twilio = require("twilio");
const Chance = require("chance");
const express = require("express");
const { urlencoded } = require("body-parser");
const ClientCapability = Twilio.jwt.ClientCapability;
const VoiceResponse = Twilio.twiml.VoiceResponse;
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");
const message = require("./routes/message");
const assert = require("assert");
const db = require("./db");

// const mongi_uri = `mongodb+srv://jasmin:qwerty@123@firstcluster-piupa.mongodb.net/test?retryWrites=true&w=majority`;

// const mongoDbUri = "mongodb://localhost:27017";
// // const client = new MongoClient(mongi_uri);
// const client = new MongoClient(mongoDbUri);

// const dbName = "twilio";

// async function main() {
//   try {
//     // Connect to the MongoDB cluster
//     // await client.connect();
//     await client.connect((err) => {
//       assert.equal(null, err);
//       console.log("Connected successfully to server");
//     });
//     await client.db(dbName);

//     // await client.close();
//     // Make the appropriate DB calls
//     // await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }
// // async function listDatabases(client) {
// //   databasesList = await client.db().admin().listDatabases();

// //   // console.log("databasesList", databasesList);
// //   console.log("Databases:");
// //   const db = client.db("twilio");
// //   db.on("error", console.error.bind(console, "MongoDB connection error:"));
// //   db.on("connected", console.log("Mongo db connected!!!"));
// //   // databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// // }
// main();

// notification

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

  const client = Twilio(accountSid, authToken);
  client.calls
    .create({
      method: "GET",
      sendDigits: "1234#",
      record: true,
      twiml:
        "<Response><Gather input='speech' enhanced='true' timeout='60' speechModel='phone_call' method='/completed'><Say>Please tell us how we can help you today. This call will be recorded for better service!</Say></Gather></Response>",
      to: request.body.number,
      from: process.env.TWILIO_NUMBER,
    })
    .then((call) => {
      console.log("call", call);
    });

  response.type("text/xml");
  response.send(voiceResponse.toString());
});

app.get("/completed", (request, response) => {
  console.log("completed call", request, response);
});

app.post("/whatsapp", (request, response) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = Twilio(accountSid, authToken);
  client.messages
    .create({
      to: "+919828350824",
      body: "Thanks for opting SMS service, you will be infromed about",
      from: "+19798595165",
    })
    .then((message) => res.send(message.sid));
});

app.post("/sms", (req, res) => {
  const MessagingResponse = Twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();
  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(3002, () => {
  console.log("Programmable Chat token server listening on port 3002!");
});
