const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const PORT = 3000;
const app = express();
const upload = multer({ dest: "public/uploads" });

// Middlewares
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
