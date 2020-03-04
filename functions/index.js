const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({
  origin: true
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// API endpoint (Post): https://us-central1-vision-finance-services.cloudfunctions.net/emailMessage

exports.emailMessage = functions.https.onRequest((req, res) => {
    const { name, email, phone, message } = req.body;
    return cors(req, res, () => {
      var text = `<div>
        <h4>Information</h4>
        <ul>
          <li>
            Customer Name: ${name || ""}
          </li>
          <li>
            Customer Email: ${email || ""}
          </li>
          <li>
          Customer Phone: +91-${phone || ""}
          </li>
        </ul>
        <h4>Queries:</h4>
        <p>${message || ""}</p>
      </div>`;

      const sesAccessKey = 'hnahak270@gmail.com';
      const sesSecretKey = 'Icando204';
  
  
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: sesAccessKey,
          pass: sesSecretKey
        }
      });

      const mailOptions = {
        from: email,
        to: "info@visionfinserv.in",
        subject: `${name} asking for a query`,
        text: text,
        html: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
       if(error){
          console.log(error.message);
          res.status(500).send("error: " + error.message + 'req body' + JSON.stringify(req.body));
       }
       res.status(200).send({
         message: "success"
       })
      });
    })
  });
