const router = require('express').Router();
const multer = require('multer');
const { verifyToken } = require('../../middlewares');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../../../uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
})

// const upload = multer({ storage: storage, limits: { fileSize: 100 } });
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }).single('image');

router.get('/', verifyToken, async (req, res) => {
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');
  res.status(200).send({ user: req.user._id, access: "authorized" });
})

router.post('/image', verifyToken, (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json(err.message);
      }
      console.log(req);
      const imagePath = "https://server.thexdream.net/geeenesis-api/uploads/images/" + req.file.filename;
      return res.status(200).json(imagePath);
    });

  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;