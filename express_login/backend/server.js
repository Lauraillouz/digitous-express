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

// Routers
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const adminRouter = require("./routers/adminRouter");

// Models

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// ROUTES
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
  });
});

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3001");
});
