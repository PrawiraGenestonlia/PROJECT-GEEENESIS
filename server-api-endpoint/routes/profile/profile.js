const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const seniorBuddy = require('../../models/seniorBuddy');
const user = require('../../models/user');
const mentor = require('../../models/mentor');
const event = require('../../models/event');
const profile = require('../../models/profile');

router.get('/', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  res.status(200).json(req.user);
});

router.get('/get-my-profile', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  const myNetworkName = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
  //
  //check profile
  const foundProfile = await profile.findOne({ email: req.user.email });
  if (!foundProfile) {
    const newProfile = new profile({
      email: req.user.email
    });
    await newProfile.save();
  }

  try {
    const foundUser = await user.findOne({ email: req.user.email });

    let response = {
      myInfo: {
        matric: foundUser._doc.matric,
        role: foundUser._doc.role,
        name: foundUser._doc.name,
        email: foundUser._doc.email,
        networkname: foundUser._doc.networkname
      },
      myMentor: [
        ...await mentor.find({ student: myNetworkName })
      ],
      myStudent: [
        ...await mentor.find({ mentor: myNetworkName })
      ],
      mySeniorBuddy: [
        ...await seniorBuddy.find({ "student": myNetworkName })
      ],
      myJuniorBuddy: [
        ...await seniorBuddy.find({ "senior buddy": myNetworkName })
      ],
      myProfile: foundProfile ? {
        ...foundProfile._doc
      } : { email: req.user.email },
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add-fav-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');

  try {

    //check if favourite exist
    const isFavourite = await profile.findOne({ email: req.user.email, "favouriteEvents.uniqueName": req.body.uniqueName });
    if (isFavourite) return res.status(200).send('Event is already fav');

    await profile.findOneAndUpdate(
      { email: req.user.email },
      { $push: { favouriteEvents: req.body } },
    );

    res.status(200).json('Event is added as favourite');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/delete-fav-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');

  try {

    // await profile.findOne({ email: req.user.email }, (err, myProfile) => {
    //   myProfile.favouriteEvents.splice(myProfile.favouriteEvents.findIndex(event => event.uniqueName == req.body.uniqueName), 1);
    //   myProfile.save();
    // });

    await profile.findOneAndUpdate({ email: req.user.email }, {
      '$pull': {
        'favouriteEvents': { 'uniqueName': req.body.uniqueName }
      }
    });

    res.status(200).json('Event is deleted from favourite');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;