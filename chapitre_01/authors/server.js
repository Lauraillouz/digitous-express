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
    res.send(`${author.books.join(", ")}`);
});



// Exercice 4 - Routes json
app.get("/json/authors/:id", (req, res) => {
    let id = req.params.id;
    let author = authors[id -1];
    res.send(`{
        name: "${author.name}",
        nationality: "${author.nationality}"
    }`);
})

app.get("/json/authors/:id/books", (req, res) => {
    let id = req.params.id;
    let author = authors[id -1];
    res.send(`{
        books: ["${author.books.join(", ")}"]
    }`)
})



app.listen(3000, () => {
    console.log("Listening on port 3000");
});