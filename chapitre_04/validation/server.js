const express = require("express");
const app = express();
const PORT = 3000;
// Libraries
const expressValidator = require("express-validator");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
