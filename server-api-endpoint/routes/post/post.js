const router = require('express').Router();
const { verifyToken } = require('../../middlewares');

router.get('/', verifyToken, async (req, res) => {
  res.json({
    user: req.user,
    posts: {
      title: "secret data"
    }
  })
})

module.exports = router;