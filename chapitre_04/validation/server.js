const express = require("express");
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
const app = express();

// Routers
const usersRouter = require("./routers/usersRouter");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));

// GENERAL GET
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
    message: "No users yet",
  });
});

// Routes
app.use("/users", usersRouter);

// Port listening
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
