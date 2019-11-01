const express = require('express');
const app = express();
const path = require('path');


app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, '../client/build')));

console.log(path.join(__dirname, '../client/build'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', "/index.html"));
});

app.listen(
  process.env.PORT || 3840,
  function () {
    console.log(`geeenesis-admin-webapp start on http://localhost:3840`)
  }
);