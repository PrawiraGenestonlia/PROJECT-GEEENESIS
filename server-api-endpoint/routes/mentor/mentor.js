const router = require('express').Router();
const tabletojson = require('tabletojson');
const { verifyToken } = require('../../middlewares');
const { mentorPairValidation } = require('../../validations');
const mentor = require('../../models/mentor');

router.get('/get-all-mentor', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  let allMentors = await mentor.find({}).sort(['student', 1]);
  let allMentorsArr = [];
  allMentors.forEach((v) => allMentorsArr.push({ ...v._doc }));
  let response = {
    columns: ['student', 'mentor'],
    data: allMentorsArr
  }
  res.status(200).json(response);
});

router.post('/add-mentor', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    //data validation
    const { error } = mentorPairValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //create new user object
    const newMentor = new mentor({
      "student": req.body.student,
      "mentor": req.body.mentor,
    });
    await newMentor.save();
    res.status(200).send(`${req.body.student} and ${req.body.mentor} has been matched successfully!`);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/clear-mentor', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    await mentor.deleteMany({});
    res.status(200).send(`mentor database is cleared!`);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/get-student', verifyToken, async (req, res) => {
  try {
    const foundStudent = await mentor.find({ mentor: req.body.mentor });
    res.status(200).send(foundStudent);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/get-mentor', verifyToken, async (req, res) => {
  try {
    const foundMentor = await mentor.find({ student: req.body.student });
    res.status(200).send(foundMentor);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/mentor-profile', verifyToken, async (req, res) => {
  try {
    tabletojson.convertUrl(
      `http://research.ntu.edu.sg/expertise/academicprofile/Pages/StaffProfile.aspx?ST_EMAILID=${req.body.mentor}`,
      function (tablesAsJson) {
        let temp = tablesAsJson[0][0]["1"].split('\n');
        let results = temp.length > 1 ? { name: temp[0], position: temp[1], email: temp[2] } : { name: temp[0] };
        for (let i = 2; i < tablesAsJson[0].length; i = i + 2) {
          results[tablesAsJson[0][i - 1]["Academic Profile"]] = tablesAsJson[0][i]["Academic Profile"];
        }
        res.status(200).send(results);
      }
    );
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;