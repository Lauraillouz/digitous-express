const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
