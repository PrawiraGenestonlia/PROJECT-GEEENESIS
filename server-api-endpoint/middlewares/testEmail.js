const nodemailer = require('nodemailer');

async function testEmail(user, message) {
  const { name, email } = user;
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: '[No Action Required!] Greetings from Geeenesis!', // Subject line
    text: message,
    html: `
    <p>
      <p>Dear ${name},</p>
      <p></p><p></p><p></p>
      <p>Greetings from GEEENESIS!</p>
      <p>${message}</p>
      <p></p>
      <p></p>
      <p>Signing off,</p>
      <p>PROJECT GEENESIS</p>
    </p>`
  };
  return new Promise((resolve, reject) => {
    try {
      //create transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      //send mail
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else
          console.log(info);
        transporter.close();
        resolve(1);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = testEmail;