const router = require('express').Router();
const user = require('../../models/user');
const { verifyToken } = require('../../middlewares');

router.get('/', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  res.status(200).send('Authorized!');
})

router.get('/get-all-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  let allUsers = await user.find({});
  let allUsersArr = [];
  allUsers.forEach((v) => allUsersArr.push({ ...v._doc }));
  for (let i = 0; i < allUsers.length; i++) {
    allUsersArr[i].action = 'action';
    allUsersArr[i].role = { options: ['superadmin', 'clubadmin', 'student', 'mentor'], current: allUsersArr[i].role };
  }
  let response = {
    columns: ['name', 'email', 'role', 'action'],
    data: allUsersArr
  }
  res.status(200).json(response);
})

router.post('/delete-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  try {
    let allUsers = await user.deleteOne({ _id: req.body._id });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }

})

module.exports = router;