const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const { seniorBuddyValidation } = require('../../validations');
const seniorBuddy = require('../../models/seniorBuddy');

router.get('/get-all-senior-buddy', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  let allSeniorBuddy = await seniorBuddy.find({}).sort([['student', 1]]);
  let allSeniorBuddyArr = [];
  allSeniorBuddy.forEach((v) => allSeniorBuddyArr.push({ ...v._doc }));
  let response = {
    columns: ['student', 'senior buddy'],
    data: allSeniorBuddyArr
  }
  res.status(200).json(response);
});

router.post('/add-senior-buddy', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    //data validation
    const { error } = seniorBuddyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //create new user object
    const newSeniorBuddy = new seniorBuddy({
      "student": req.body.student,
      "senior buddy": req.body['senior buddy'],
    });
    await newSeniorBuddy.save();
    const temp = req.body['senior buddy'];
    res.status(200).send(`${req.body.student} and ${temp} has been matched successfully!`);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/clear-senior-buddy', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    await seniorBuddy.deleteMany({});
    res.status(200).send(`senior buddy database is cleared!`);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/get-student', verifyToken, async (req, res) => {
  try {
    const foundStudent = await seniorBuddy.find({ "senior buddy": req.body['senior buddy'] });
    res.status(200).send(foundStudent);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/get-senior-buddy', verifyToken, async (req, res) => {
  try {
    const foundSeniorBuddy = await seniorBuddy.find({ student: req.body.student });
    res.status(200).send(foundSeniorBuddy);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;