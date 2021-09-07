const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
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
// Data Students
const students = [{ name: "Laura" }, { name: "Emran" }, { name: "Rahmad" }];

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Mongoose
const StudentSchema = new mongoose.Schema({
  name: String,
});
const Student = mongoose.model("Student", StudentSchema);

//Routes
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
  });
});

app.get("/students", async (_req, res) => {
  const students = await Student.find();
  res.json({
    status: "OK",
    data: students,
  });
});

app.post("/students", async (req, res) => {
  const newStudent = req.body;
  const students = await Student.create(newStudent);
  res.json({
    message: "Student added",
    data: students,
  });
});

// Server listening
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3001");
});
