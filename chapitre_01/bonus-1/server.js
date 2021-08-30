const express = require("express");
const app = express();
const port = 3001;

var responseAPICountries = require("./dataCountries.js");

// Route Homepage
app.get("/", (req, res) => {
    res.send("API Countries")
})

// Route responseAPICountries
app.get("/countries/", (req, res) => {
    res.send(responseAPICountries);
})

// Écoute serveur
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});