require("dotenv").config();

// Node/Express
const Twilio = require("twilio");
const Chance = require("chance");
const express = require("express");
const app = express();

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chance = new Chance();

app.get("/token", (req, res) => {
  console.log(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = chance.name();
  token.addGrant(
    new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    })
  );

  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
  });
});

app.listen(3001, () => {
  console.log("Programmable Chat token server listening on port 3001!");
});
// const router = require("./src/router");
// const syncServiceDetails = require("./src/sync_service_details");

// Create Express webapp

// app.use(express.static(path.join(__dirname, "public")));

// // Add body parser for Notify device registration
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// // app.use(pino);

// // app.use(router);

// // Get Sync Service Details for lazy creation of default service if needed
// // syncServiceDetails();

// // Create http server and run it
// const server = http.createServer(app);
// const port = process.env.PORT || 3001;
// server.listen(port, function () {
//   console.log("Express server running on *:" + port);
// });

// module.exports = app;
