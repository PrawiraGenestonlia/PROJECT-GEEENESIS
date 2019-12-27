const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, '../ntu-eee-geeenesis/web-build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../ntu-eee-geeenesis/web-build', "/index.html"));
});

app.listen(
  3850,
  function () {
    console.log(`geeenesis-mobile-pwa start on http://localhost:3850`)
  }
);