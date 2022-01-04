require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const removeHtml = (myString) => myString.replace(/<[^>]*>?/gm, "");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const {
  AMADEUS_CLIENT_ID,
  AMADEUS_CLIENT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} = process.env;

const Amadeus = require("amadeus");
const amadeusClient = new Amadeus({
  clientId: AMADEUS_CLIENT_ID,
  clientSecret: AMADEUS_CLIENT_SECRET,
});

const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.post("/sms", async (req, res) => {
  const {
    Body: countryCode,
    To: originPhone,
    From: destinationPhone,
  } = req.body;

  try {
    const response = await amadeusClient.client.get(
      "/v1/duty-of-care/diseases/covid19-area-report",
      { countryCode }
    );
    const restrictions = response.data;

    const body = `
  ${restrictions.areaRestrictions
    .map((areaRestriction) => removeHtml(areaRestriction.text))
    .join(". ")}\n
  ${restrictions.areaAccessRestriction.entry.rules}\n
  `;
    await twilioClient.messages.create({
      body,
      from: originPhone,
      to: destinationPhone,
    });

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(body);
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/xml" });
    res.end("Something happened", e);
  }
});

http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});
