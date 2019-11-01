const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const { clubInformationValidation } = require('../../validations');
const club = require('../../models/club');

router.get('/', verifyToken, async (req, res) => {
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
  res.status(200).send({ user: req.user._id, access: "authorized" });
})

router.get('/get-clubs', async (req, res) => {
  if (req.query.club) {
    try {
      let clubInfo = await club.find({ server_unique_name: req.query.club });
      if (clubInfo) return res.status(200).send(clubInfo);
      else return res.status(400).send("No results found");
    } catch (err) {
      res.status(400).send(err);
    }
  }
  else {
    try {
      let allClubs = await club.find({});
      res.status(200).send(allClubs);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post('/create-club', verifyToken, async (req, res) => {
  //check authorization
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');

  //data validation
  const { error } = clubInformationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if club exist
  const isClubExist = await club.findOne({ server_unique_name: req.body.server_unique_name });
  if (isClubExist) return res.status(400).send('Club already exists');

  const newClub = new club({
    title: req.body.title,
    bannerImgLink: req.body.bannerImgLink,
    server_unique_name: req.body.server_unique_name,
    summary: req.body.summary,
    contactLink: req.body.contactLink,
    rawEditor: req.body.rawEditor,
  });
  try {
    await newClub.save();
    res.status(200).send('Club is created');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/edit-club', verifyToken, async (req, res) => {
  //check authorization
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');

  //data validation
  const { error } = clubInformationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if club exist
  const isClubExist = await club.findOne({ server_unique_name: req.body.server_unique_name });
  if (!isClubExist) return res.status(400).send('Club does not exist');

  try {
    //update
    const updatedClub = await club.findOneAndUpdate({ server_unique_name: req.body.server_unique_name, }, {
      title: req.body.title,
      bannerImgLink: req.body.bannerImgLink,
      summary: req.body.summary,
      contactLink: req.body.contactLink,
      rawEditor: req.body.rawEditor,
    });
    res.status(200).send(`${req.body.title} is updated successfuly`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;