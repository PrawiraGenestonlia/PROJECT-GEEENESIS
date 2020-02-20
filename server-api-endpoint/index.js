const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require("rotating-file-stream");
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

require('dotenv').config();

//import routes
const { authRoute, getInfoRoute } = require('./routes/user');
const { postRoute } = require('./routes/post');
const { adminUserRoute } = require('./routes/admin');
const { mentorRoute } = require('./routes/mentor');
const { seniorBuddyRoute } = require('./routes/seniorbuddy');
const { clubAdminRoute } = require('./routes/club');
const { eventRoute } = require('./routes/event');
const { uploadImageRoute } = require('./routes/upload');

//connect to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected to MongoDB...");
}).catch(err => console.error("Could not connect to MongoDB...", err));

// create a write stream (in append mode)
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream(process.env.DEV ? 'dev.log' : 'access.log', {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1M", // rotate daily
  compress: "gzip", // compress rotated files
  path: logDirectory
});

//middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('short', { stream: accessLogStream }));

app.get('/', async (req, res) => { res.send('geeenesis API server is up') });
app.use('/user', authRoute);
app.use('/get-user', getInfoRoute);
app.use('/post', postRoute);
app.use('/admin-user', adminUserRoute);
app.use('/club-admin', clubAdminRoute);
app.use('/mentor', mentorRoute);
app.use('/senior-buddy', seniorBuddyRoute);
app.use('/event', eventRoute);
app.use('/upload-image', uploadImageRoute);
app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT || 5002, () => {
  console.log('geeenesis-api server is running');
});

