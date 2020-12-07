const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ subject, text, res, req }) => {
  try {
    const msg = {
      to: req.body.event.data.new.email,
      from: "valid@sendgrid.net", // Use the email address or domain you verified above
      subject,
      text,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    const emailSentResponse = await sgMail.send(msg);
    res.json({ msg, emailSentResponse });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
      res.json({ error });
    }
  }
};

app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/confirm/administrator", function (req, res) {
  sendMail({
    subject: "New administrator for: xxxx",
    text: `Hi, You can now start creating issuers on LINK `,
    res,
    req
  });
});

app.post("/confirm/issuer", function (req, res) {
  sendMail({
    subject: "New issuer for: xxxx",
    text: `Hi, You can now start creating certificates on LINK `,
    res,
    req
  });
});

app.post("/confirm/certificate", function (req, res) {
  sendMail({
    subject: "New certificate for: xxxx",
    text: "Hi, You can now view your certificate on LINK",
    res,
    req
  });
});

app.listen(app.get("port"), function () {
  console.log("Server started on: " + app.get("port"));
});
