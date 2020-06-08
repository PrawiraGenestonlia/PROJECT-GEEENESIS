const express = require('express');
const app = express();
const listEndpoints = require('express-list-endpoints');
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
const { profileRoute } = require('./routes/profile');
const { clubAdminRoute } = require('./routes/club');
const { eventRoute } = require('./routes/event');
const { uploadImageRoute } = require('./routes/upload');
const { chatRoute } = require('./routes/chat');

//connect to db
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
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
morgan.token('remote-addr', function (req) {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
//middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('short', { stream: accessLogStream }));
app.get('/genesis-api/', async (req, res) => {
  //
  let response = {
    "server": "geeenesis-api running at " + req['headers']['host'],
    "status": "alive and healthy",
    "server time": new Date().toLocaleDateString,
    "available routes": {}
  }
  //
  response["available routes"] = listEndpoints(app);
  console.table(response["available routes"]); //print table
  res.send(response);
});
app.use('/genesis-api/user', authRoute);
app.use('/genesis-api/get-user', getInfoRoute);
app.use('/genesis-api/post', postRoute);
app.use('/genesis-api/admin-user', adminUserRoute);
app.use('/genesis-api/club-admin', clubAdminRoute);
app.use('/genesis-api/mentor', mentorRoute);
app.use('/genesis-api/senior-buddy', seniorBuddyRoute);
app.use('/genesis-api/profile', profileRoute);
app.use('/genesis-api/event', eventRoute);
app.use('/genesis-api/chat', chatRoute);
app.use('/genesis-api/upload-image', uploadImageRoute);
app.use('/genesis-api/uploads', express.static('uploads'));


app.listen(process.env.PORT || 5002, () => {
  console.log('geeenesis-api server is running');
});