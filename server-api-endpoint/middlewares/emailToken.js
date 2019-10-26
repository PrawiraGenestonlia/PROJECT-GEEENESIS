const nodemailer = require('nodemailer');


function emailToken(responseBody) {
  const { name, email, otpToken } = responseBody;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: 'Registration otp', // Subject line
    text: `Your registration otp is ${otpToken}. `,
    html: `
    <p>
      <p>Dear ${name},</p>
      <p>Your registration otp is ${otpToken}. </p>
      <p>This otp only last for one minute. Please request another otp if this otp expires</p>
    </p>`,
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
      <p>Dear ${name},</p>
      <p>Your registration otp is ${otpToken}. </p>
      <p>This otp only last for one minute. Please request another otp if this otp expires</p>
      </body>
    </html>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports = emailToken;