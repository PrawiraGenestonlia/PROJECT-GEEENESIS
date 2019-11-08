const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '../../uploads/images'});

router.post('/upload', upload.single('image'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});