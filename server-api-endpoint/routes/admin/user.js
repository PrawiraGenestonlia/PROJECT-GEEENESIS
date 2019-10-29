const router = require('express').Router();
const user = require('../../models/user');
const { verifyToken } = require('../../middlewares');

router.get('/', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  res.status(200).send('Authorized!');
})

router.get('/get-all-user', verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin") return res.status(401).send('Unauthorized Access!');
  const allUsers = await user.find({});
  let response = {
    columns: ['name', 'email', 'role'],
    data: allUsers
  }
  res.status(200).send(response);
})


module.exports = router;