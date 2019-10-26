const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//import routes
const { authRoute } = require('./routes/user');
const { postRoute } = require('./routes/post');
//todo more routes

//connect to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected to MongoDB...");
}).catch(err => console.error("Could not connect to MongoDB...", err));

//middleware
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('geeenesis API server is up');
})

app.use('/user', authRoute);
app.use('/post', postRoute);

app.listen(process.env.PORT || 5002, () => {
  console.log('geeenesis-api server is running');
});

