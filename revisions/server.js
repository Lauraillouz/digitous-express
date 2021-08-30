const express = require("express");
const app = express();
// PORT
const PORT = 3000;
// Data authors
const authors = require("./authors");

// Exercice 1
app.get("/", (req, res) => {
  res.json({
    message: "Authors API",
  });
});
// Exercice 2
app.get("/authors/:id", (req, res) => {
  let authorId = req.params.id;
  let author = authors[authorId - 1];
  res.json({
    name: author.name,
    nationality: author.nationality,
  });
});
// Exercice 3
app.get("/authors/:id/books", (req, res) => {
  let authorId = req.params.id;
  let author = authors[authorId - 1];
  res.json({
    books: author.books,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
