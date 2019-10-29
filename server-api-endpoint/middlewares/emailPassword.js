const nodemailer = require('nodemailer');


function emailPassword(user, password) {
  const { name, email } = user;

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
    subject: '[Action Required!] Welcome to Geeenesis!', // Subject line
    text: `Your password is ${password}. Please change your password!`,
    html: `
    <p>
      <p>Dear ${name},</p>
      <p></p>
      <p>Welcome to NTU EEE!</p>
      <p>Geeenesis is a platform created by students for better integrate EEE/IEM students into University life. 
      As part of mentoring system, you are required to download the application at https://comingsoon/. We have also created an account on your behalf.</p>
      <p>Your password is <strong>${password}</strong>. </p>
      <p>As this is a randomly generated password, please login and change your password immediately</p>
      <p></p>
      <p>Once again, we welcome you. All the best for your endeavour in NTU!</p>
      <p></p>
      <p></p>
      <p>Signing off,</p>
      <p>PROJECT GEENESIS</p>
    </p>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports = emailPassword;