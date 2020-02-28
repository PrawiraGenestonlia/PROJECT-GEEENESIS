const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const seniorBuddy = require('../../models/seniorBuddy');
const user = require('../../models/user');
const mentor = require('../../models/mentor');
const event = require('../../models/event');
const profile = require('../../models/profile');

const createProfile = async (email) => {
  const foundProfile = await profile.findOne({ email: email });
  if (!foundProfile) {
    const newProfile = new profile({
      email: req.user.email
    });
    await newProfile.save();
  }
}

router.get('/', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  res.status(200).json("Profile route is running...");
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
        networkname: foundUser._doc.networkname,
        avatarUrl: foundUser._doc.avatarUrl
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
      } : { email: req.user.email, favouriteEvents: [], interestedEvents: [], participatedEvents: [] },
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add-fav-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    await profile.findOneAndUpdate(
      { email: req.user.email, "favouriteEvents.uniqueName": { $ne: req.body.uniqueName } },
      { $push: { favouriteEvents: req.body } },
    );
    res.status(200).json('Event is added as interested');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/delete-fav-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
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

router.post('/add-interested-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    await profile.findOneAndUpdate(
      { email: req.user.email, "interestedEvents.uniqueName": { $ne: req.body.uniqueName } },
      { $push: { interestedEvents: req.body } },
    );
    res.status(200).json('Event is added as interested');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/delete-interested-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    const result = await profile.findOneAndUpdate({ email: req.user.email }, {
      '$pull': {
        'interestedEvents': { 'uniqueName': req.body.uniqueName }
      }
    });
    res.status(200).json('Event is deleted from interested');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add-participated-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    await profile.findOneAndUpdate(
      { email: req.user.email, "participatedEvents.uniqueName": { $ne: req.body.uniqueName } },
      { $push: { participatedEvents: req.body } },
    );
    res.status(200).json('Event is added as participated');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/delete-participated-event', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  try {
    const result = await profile.findOneAndUpdate({ email: req.user.email }, {
      '$pull': {
        'participatedEvents': { 'uniqueName': req.body.uniqueName }
      }
    });
    res.status(200).json('Event is deleted from participated');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/get-my-chat-list', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  const myNetworkName = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
  createProfile(req.user.email);
  try {
    const listOfMyMentors = await mentor.find({ student: myNetworkName });
    const listOfMyStudents = await mentor.find({ mentor: myNetworkName });
    const listOfMySeniorBuddy = await seniorBuddy.find({ "student": myNetworkName });
    const listOfMyJuniorBuddy = await seniorBuddy.find({ "senior buddy": myNetworkName });

    let chatList = new Set();

    listOfMyMentors.forEach(v => {
      chatList.add(v['student']);
      chatList.add(v['mentor']);
    });

    listOfMyStudents.forEach(v => {
      chatList.add(v['student']);
      chatList.add(v['mentor']);
    });

    listOfMySeniorBuddy.forEach(v => {
      chatList.add(v['student']);
      chatList.add(v['senior buddy']);
    });

    listOfMyJuniorBuddy.forEach(v => {
      chatList.add(v['student']);
      chatList.add(v['senior buddy']);
    });

    chatList.delete(myNetworkName);

    let response = [];

    for (const v of chatList) {
      let doc = await user.findOne({ networkname: v });
      response.push({ name: doc._doc['name'], email: doc._doc['email'], role: doc._doc['role'], networkname: v });
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;