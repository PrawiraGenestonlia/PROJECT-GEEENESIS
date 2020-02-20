const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const seniorBuddy = require('../../models/seniorBuddy');
const user = require('../../models/user');
const mentor = require('../../models/mentor');
const profile = require('../../models/profile');

router.get('/', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  res.status(200).json(req.user);
});

router.get('/get-my-profile', verifyToken, async (req, res) => {
  if (!req.user.role) return res.status(401).send('Unauthorized Access!');
  const myNetworkName = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
  //
  try {
    let response = {
      myInfo: async () => {
        const temp = await user.findOne({ email: req.user.email });
        return { matric: temp._doc.matric, role: temp._doc.role, name: temp._doc.name, email: temp._doc.email, networkname: temp._doc.networkname }
      },
      myMentor: {
        ...await mentor.find({ mentor: myNetworkName })
      },
      myStudent: {
        ...await mentor.find({ student: myNetworkName })
      },
      mySeniorBuddy: {
        ...await seniorBuddy.find({ "senior buddy": myNetworkName })
      },
      myJuniorBuddy: {
        ...await seniorBuddy.find({ student: myNetworkName })
      },
      myProfile: {
        ...await profile.findOne({ email: req.user.email })
      },
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(200).json(err);
  }
});


module.exports = router;