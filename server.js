const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ subject, text, res, req }) => {
  const msg = {
    to: req.body.event.data.new.email,
    from: "lennert_vansever@hotmail.be", // Use the email address or domain you verified above
    subject,
    text
  };

  try {
    const emailSentResponse = await sgMail.send(msg);
    res.json({ msg, emailSentResponse });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
      res.json({ error: error.response.body });
    }
  }
};

app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/confirm/administrator", function(req, res) {
  try {
    sendMail({
      subject: "New administrator for: xxxx",
      text: `Hi, You can now start creating issuers on LINK `,
      res,
      req
    });
  } catch (error) {
    res.json({ error: error });
  }
});
app.listen(app.get("port"), function() {
  console.log("Server started on: " + app.get("port"));
});
