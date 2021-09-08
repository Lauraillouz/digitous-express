const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

const app = express();
const upload = multer({ dest: "public/uploads" });

// Schéma + Model Mongo
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());

// Routes
app.get("/", async (_req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({
    status: "OK",
    users: users,
  });
});

app.post("/user", upload.single("image"), async (req, res) => {
  // Get infos back from front
  let username = req.query.name;
  let profilePic = req.file;
  // Photo to original format
  let date = new Date();
  date = date.toLocaleDateString().replace(/\//g, "-");
  let extension = profilePic.originalname.split(".")[1];
  let imgName = `${username.toLowerCase()}-${date}.${extension}`;

  fs.renameSync(req.file.path, path.join(req.file.destination, imgName));
  // Save users
  const newUser = await User.create({
    name: req.query.name,
    image: req.file.destination + "/" + imgName,
  });
  console.log(newUser);
  // Response
  res.json({
    status: "OK",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
