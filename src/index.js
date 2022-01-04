// Get country code from the body or get param (From Twilio SMS)
const countryCode = "ES";

// Get restrictions from Amadeus API
const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

amadeus.client
  .get("/v1/duty-of-care/diseases/covid19-area-report", { countryCode })
  .then(function (response) {
    console.log(response.data);
    // Format message

    // Call Twilio to send SMS
  })
  .catch((error) => {
    console.log("Error", error);
  });
