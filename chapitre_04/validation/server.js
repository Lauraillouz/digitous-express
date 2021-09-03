const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
// Routers
const usersRouter = require("./routers/usersRouter");
// Libraries
const expressValidator = require("express-validator");

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
