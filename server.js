const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { getReceivingAddressFromRequest, sendEmail, getEmailTemplate} = require('./mail');

app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/confirm/administrator", async (req, res) => {
  const response = await sendEmail({
    subject: "Nieuwe xxx administrator",
    htmlContent: getEmailTemplate({
      greetings: 'Beste,',
      message: 'U heeft toegang gekregen om administrator te zijn voor xxx',
      href: 'https://www.google.com',
      action: 'Open portal',
    }),
    to: getReceivingAddressFromRequest(req)
  });
  res.json({ response });
});

app.post("/confirm/issuer", function (req, res) {
  const response = await sendEmail({
    subject: "Nieuwe xxx issuer",
    htmlContent: getEmailTemplate({
      greetings: 'Beste,',
      message: 'U heeft toegang gekregen om certificaten aan te maken voor xxx',
      href: 'https://www.google.com',
      action: 'Open portal',
    }),
    to: getReceivingAddressFromRequest(req)
  });
  res.json({ response });
});

app.post("/confirm/certificate", function (req, res) {
  const response = await sendEmail({
    subject: "Nieuwe xxx certificaat",
    htmlContent: getEmailTemplate({
      greetings: 'Beste,',
      message: 'U heeft een nieuwe certificaat ontvangen',
      href: 'https://www.google.com',
      action: 'Open certificaat',
    }),
    to: getReceivingAddressFromRequest(req)
  });
  res.json({ response });
});

app.listen(app.get("port"), function () {
  console.log("Server started on: " + app.get("port"));
});
