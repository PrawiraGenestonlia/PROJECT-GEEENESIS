const router = require('express').Router();
const { verifyToken } = require('../../middlewares');

router.get('/role', verifyToken, async (req, res) => {
  res.status(200).send(req.user.role)
})

router.get('/email', verifyToken, async (req, res) => {
  res.status(200).send(req.user.email)
})

router.get('/id', verifyToken, async (req, res) => {
  res.status(200).send(req.user._id)
})

router.get('/networkname', verifyToken, async (req, res) => {
  //extract email
  let networkname = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
  res.status(200).send(networkname)
})

module.exports = router;