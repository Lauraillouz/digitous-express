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

// Router
const hotelsRouter = require("./routers/hotelsRouter");
const restaurantsRouter = require("./routers/restaurantsRouter");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));

// General
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
  });
});

// Routes
app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);

// Listening on PORT
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
