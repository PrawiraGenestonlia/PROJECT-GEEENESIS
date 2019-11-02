const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

require('dotenv').config();

//import routes
const { authRoute, getInfoRoute } = require('./routes/user');
const { postRoute } = require('./routes/post');
const { adminUserRoute } = require('./routes/admin');
const { clubAdminRoute } = require('./routes/club');
//todo more routes

//connect to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected to MongoDB...");
}).catch(err => console.error("Could not connect to MongoDB...", err));

//middleware
app.use(compression());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('geeenesis API server is up');
})

app.use('/user', authRoute);
app.use('/get-user', getInfoRoute);
app.use('/post', postRoute);
app.use('/admin-user', adminUserRoute);
app.use('/club-admin', clubAdminRoute);

app.listen(process.env.PORT || 5002, () => {
  console.log('geeenesis-api server is running');
});

