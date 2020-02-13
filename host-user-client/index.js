const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const PORT = process.env.PORT || 3860;

app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, '../user-client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../user-client/build', "/index.html"));
});

app.listen(
  PORT,
  function () {
    console.log(`Geeenesis user-client start on http://localhost:${PORT}`);
  }
);