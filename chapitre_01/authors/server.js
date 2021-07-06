const express = require("express");
const app = express();

var authors = require("./authors.js");

// Route homepage
app.get("/", (req, res) => {
    res.send("Authors API");
});

// Routes
app.get("/authors/:authorId", (req, res) => {
    let authorId = req.params.authorId;
    let author = authors[authorId -1];
    res.send(`${author.name}, ${author.nationality}`);
});






app.listen(3000, () => {
    console.log("Listening on port 3000");
});