const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { verifyToken } = require('../../middlewares');
const { emailToken, testEmail } = require('../../middlewares');
const EmailPassword = require('../../middlewares/emailPassword');
const user = require('../../models/user');
const { registerValidation, loginValidation,
  forgetPasswordValidation, changePasswordValidation } = require('../../validations');



router.post('/register', async (req, res) => {
  //data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const isEmailExist = await user.findOne({ email: req.body.email });
  if (isEmailExist) return res.status(400).send('Email already exists');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create otp secret
  const otpSecretToken = speakeasy.generateSecret({ length: 20 });
  const otpToken = speakeasy.totp({ "secret": otpSecretToken.base32, "encoding": "base32", digits: 4, step: 60 });

  //create response body
  const responseBody = {
    "name": req.body.name,
    "email": req.body.email,
    "role": req.body.role,
    "networkname": req.body.email,
    "password": hashedPassword,
    "otpSecretToken": otpSecretToken.base32,
    "otpToken": otpToken,
  }
  emailToken(responseBody);
  res.status(200).send({ ...responseBody });
})

router.post('/registerValidation', async (req, res) => {
  try {
    //token validation
    const tokenValidation = speakeasy.totp.verify({
      secret: req.body.otpSecretToken,
      encoding: "base32",
      token: req.body.otpToken,
      window: 1,
      digits: 4,
      step: 60
    });
    if (tokenValidation) {
      //extract email
      let networkname = req.body.email.substring(0, req.body.email.lastIndexOf("@"));

      //create new user object
      const newUser = new user({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role,
        "networkname": networkname,
      });
      try {
        const savedUser = await newUser.save();
        return res.status(200).send('Register successfully!');
      } catch (err) {
        return res.status(400).send(err);
      }

    }
    else { return res.status(400).send('Token is invalid') }
  } catch (err) {
    res.status(400).send('Token is invalid');
  }

})

router.post('/registerWithoutAuth', async (req, res) => {
  //data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const isEmailExist = await user.findOne({ email: req.body.email });
  if (isEmailExist) return res.status(400).send('Email already exists');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //extract email
  let networkname = req.body.email.substring(0, req.body.email.lastIndexOf("@"));

  //create new user object
  const newUser = new user({
    "name": req.body.name,
    "email": req.body.email,
    "password": hashedPassword,
    "role": req.body.role,
    "networkname": networkname,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send('Register successfully!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //data validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const currentUser = await user.findOne({ email: req.body.email });
  if (!currentUser) return res.status(400).send('Account does not exist. Please sign up first!');

  //check password
  const validPass = await bcrypt.compare(req.body.password, currentUser.password);
  if (!validPass) return res.status(400).send('Wrong password!');

  //jwt signing
  const token = jwt.sign({ _id: currentUser._id, email: currentUser.email, role: currentUser.role }, process.env.JWT_TOKEN);

  res.header('auth-token', token).send(token);
})

router.post('/changepassword', verifyToken, async (req, res) => {
  //data validation
  const { error } = changePasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const currentUser = await user.findOne({ email: req.body.email });
  if (!currentUser) return res.status(400).send('Account does not exist. Please sign up first!');

  //check password
  const validPass = await bcrypt.compare(req.body.currentPassword, currentUser.password);
  if (!validPass) return res.status(400).send('Wrong password!');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  //update user
  const updatedUser = await user.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword });

  //jwt signing
  const token = jwt.sign({ _id: currentUser._id, email: currentUser.email, role: currentUser.role }, process.env.JWT_TOKEN);

  res.header('auth-token', token).send(token);
})

router.post('/changepasswordwithoutemail', verifyToken, async (req, res) => {
  //data validation
  // const { error } = changePasswordValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const currentUser = await user.findOne({ email: req.user.email });
  if (!currentUser) return res.status(400).send('Account does not exist. Please sign up first!');

  //check if password verified
  if (req.body.newPassword !== req.body.newPasswordValidation) return res.status(400).send('New password does not match.');

  //check password
  const validPass = await bcrypt.compare(req.body.currentPassword, currentUser.password);
  if (!validPass) return res.status(400).send('Wrong password!');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  //update user
  const updatedUser = await user.findOneAndUpdate({ email: req.user.email }, { password: hashedPassword });

  //jwt signing
  const token = jwt.sign({ _id: currentUser._id, email: currentUser.email, role: currentUser.role }, process.env.JWT_TOKEN);

  res.header('auth-token', token).send(token);
})

//
router.post('/forgetpassword', async (req, res) => {
  //data validation
  const { error } = forgetPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exist
  const currentUser = await user.findOne({ email: req.body.email });
  if (!currentUser) return res.status(400).send('Account does not exist!');

  //generate random 6 digit password
  const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(randomPassword, salt);

  //update user
  const updatedUser = await user.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword });

  //send email
  EmailPassword(updatedUser, randomPassword).then(() => {
    res.status(200).send(`Your new password has been sent to ${req.body.email}`);
  }).catch((err) => {
    res.status(400).send(err);
  });
})

router.get('/test-email', async (req, res) => {
  const user = { name: req.body.name || "No Name", email: req.body.email || "prawira.96@gmail.com" };
  const message = req.body.message || "test geeenesis email";
  //send email
  testEmail(user, message).then(() => {
    res.status(200).send(`Email has been sent to ${req.body.email}`);
  }).catch((err) => {
    res.status(400).send(err);
  });
})

module.exports = router;