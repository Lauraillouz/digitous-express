const express = require("express");
const app = express();

var authors = require("./authors.js");


app.get("/", (req, res) => {
    res.send("Authors API");
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})