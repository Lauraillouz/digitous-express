const express = require("express");
const app = express();
const cors = require("cors");
// Port
const PORT = 3001;
// Data Students
const students = [{ name: "Laura" }, { name: "Emran" }, { name: "Rahmad" }];

app.use(express.json());
app.use(cors());

// Middleware global
app.use((req, res, next) => {
  console.log("Yas");
  next();
});

//Routes
app.get("/students", (req, res) => {
  res.json({
    students,
  });
});

app.post("/students", (req, res) => {
  const newStudent = req.body;
  console.log(newStudent);
  res.json({
    message: "Student added",
    newStudent,
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
