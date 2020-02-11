const router = require('express').Router();
const user = require('../../models/user');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../../middlewares');
const { registerValidationNoPassword, } = require('../../validations');
const EmailPassword = require('../../middlewares/emailPassword');

router.get('/', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  res.status(200).send('Authorized!');
});

router.get('/get-all-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  let allUsers = await user.find({}).sort([['role', 1], ['name', 1]]);
  let allUsersArr = [];
  allUsers.forEach((v) => allUsersArr.push({ ...v._doc }));
  for (let i = 0; i < allUsers.length; i++) {
    allUsersArr[i].action = 'action';
    allUsersArr[i].role = { options: ['superadmin', 'clubadmin', 'student', 'mentor'], current: allUsersArr[i].role };
  }
  let response = {
    columns: ['name', 'email', 'matric', 'role', 'action'],
    data: allUsersArr
  }
  res.status(200).json(response);
});

router.post('/delete-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    let allUsers = await user.deleteOne({ _id: req.body._id });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/update-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    //update user
    const updatedUser = await user.findOneAndUpdate({
      _id: req.body._id
    }, {
      "email": req.body.email,
      "matric": req.body.matric,
      "name": req.body.name,
      "role": req.body.role
    });
    res.status(200).json('Successfully edited!');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    //data validation
    const { error } = registerValidationNoPassword(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user exist
    const isEmailExist = await user.findOne({ email: req.body.email });
    if (isEmailExist) return res.status(400).send('Email already exists');

    //generate random 6 digit password
    const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    //extract email
    let networkname = req.body.email.substring(0, req.body.email.lastIndexOf("@"));

    //create new user object
    const newUser = new user({
      "name": req.body.name,
      "email": req.body.email,
      "password": hashedPassword,
      "matric": req.body.matric,
      "role": req.body.role,
      "networkname": networkname,
    });
    await newUser.save();
    //send email
    EmailPassword(newUser, randomPassword).then(() => {
      res.status(200).send(`${req.body.name} has been registered successfully!`);
    }).catch((err) => {
      res.status(400).send(err);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;