const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const app = express();
const upload = multer({ dest: "public/uploads" });

// Users
const users = [{ name: "Bli" }, { name: "Bla" }, { name: "Blou" }];

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    users: users,
  });
});

app.post("/user", upload.single("image"), (req, res) => {
  // Get infos back from front
  let username = req.query;
  let profilePic = req.file;
  console.log("username is", username);
  console.log("profile pic is", profilePic);
  // Photo to original format
  let date = new Date();
  date = date.toLocaleDateString().replace(/\//g, "-");
  let extension = profilePic.originalname.split(".")[1];
  let imgName = `${username.name.toLowerCase()}-${date}.${extension}`;
  let newPath = `public/uploads/${imgName}`;
  console.log("new path is", newPath);

  fs.renameSync(req.file.path, path.join(req.file.destination, imgName));

  // Save users
  users.push(username);
  // Response
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
