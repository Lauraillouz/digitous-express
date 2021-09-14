const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
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
    console.log("Connected to mongoDB");
  });

// Models

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3001");
});
