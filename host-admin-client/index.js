const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const PORT = process.env.PORT || 3101;

app.disable('x-powered-by');
app.use(compression());
app.use("/genesis-admin", express.static(path.join(__dirname, '../admin-client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../admin-client/build', "/index.html"));
});

app.listen(
  PORT,
  function () {
    console.log(`geeenesis-admin-webapp start on http://localhost:${PORT}`)
  }
);