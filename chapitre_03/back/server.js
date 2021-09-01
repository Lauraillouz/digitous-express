const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const app = express();
const upload = multer({ dest: "public/uploads" });

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());

// Routes
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
  });
});

app.post("/user", upload.single("image"), (req, res) => {
  let username = req.query;
  let profilePic = req.file;
  console.log("username is", username);
  console.log("profile pic is", profilePic);
  fs.renameSync(
    profilePic.path,
    path.join(profilePic.destination, profilePic.originalname)
  );
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
