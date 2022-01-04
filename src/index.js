const http = require("http");
const express = require("express");

const app = express();

const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

app.post("/sms", async (req, res) => {
  // TODO: Get country code from the body or get param (From Twilio SMS)
  const countryCode = "ES";

  const restrictions = await amadeus.client.get(
    "/v1/duty-of-care/diseases/covid19-area-report",
    { countryCode }
  );
  console.log(`THE RESTRICTIONS FROM ${countryCode} ARE:\n
  ${JSON.stringify(restrictions.data)}
  `);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end("<p>Worked</p>");
});

http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});
