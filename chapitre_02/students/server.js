const express = require("express");
const app = express();
// Port
const PORT = 3000;

// Server listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
