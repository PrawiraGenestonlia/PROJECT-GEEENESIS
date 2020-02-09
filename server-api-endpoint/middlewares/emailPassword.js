const nodemailer = require('nodemailer');

async function emailPassword(user, password) {
  const { name, email } = user;
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: '[Action Required!] Welcome to Geeenesis!', // Subject line
    text: `Your password is ${password}. Please change your password!`,
    html: `
    <p>
      <p>Dear ${name},</p>
      <p></p><p></p><p></p>
      <p>Welcome to NTU EEE!</p>
      <p>Geeenesis is a platform created by students for better integrate EEE/IEM students into University life. 
      As part of mentoring system, you are required to download the application at https://server.thexdream.net/geeenesis. We have also created an account on your behalf.</p>
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
        if (err)
          console.log(err)
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

module.exports = emailPassword;