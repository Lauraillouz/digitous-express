const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");

// Connexion à MongoDB
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB !");
  });

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));

// Mongoose - Schéma
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationality: String,
  books: Array,
});

// Mongoose - Modèle
const Author = mongoose.model("Author", AuthorSchema);

// GET
app.get("/", (_req, res) => {
  res.json({
    status: "OK",
    message: "Authors API",
  });
});

app.get("/authors", async (_req, res) => {
  const authors = await Author.find();
  res.json({
    status: "OK",
    data: authors,
  });
});

app.get("/authors/:id/", async (req, res) => {
  let author = await Author.findById(req.params.id);
  res.json({
    status: "OK",
    data: author,
  });
});

app.get("/authors/:id/books/", async (req, res) => {
  let author = await Author.findById(req.params.id);
  res.json({
    status: "OK",
    data: author.books,
  });
});

// POST
app.post("/authors", async (req, res) => {
  await Author.create(req.body);

  res.json({
    status: "Author created",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
