require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-sms", (req, res) => {
    const { message, phoneNumber } = req.body;

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        })
        .then(() => res.send("SMS Sent!"))
        .catch(err => res.status(500).send(err));
});

app.listen(3000, () => console.log("Server running on port 3000"));
