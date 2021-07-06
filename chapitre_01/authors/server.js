const express = require("express");
const app = express();

var authors = require("./authors.js");

// Exercie 1 - Route homepage
app.get("/", (req, res) => {
    res.send("Authors API");
});

// Exercice 2 - Routes auteurs
app.get("/authors/:authorId/", (req, res) => {
    let authorId = req.params.authorId;
    let author = authors[authorId -1];
    res.send(`${author.name}, ${author.nationality}`);
});

// Exercice 3 - Routes livres
app.get("/authors/:authorId/books/", (req, res) => {
    let authorId = req.params.authorId;
    let author = authors[authorId -1];
    res.send(`${author.books}`);
});




app.listen(3000, () => {
    console.log("Listening on port 3000");
});