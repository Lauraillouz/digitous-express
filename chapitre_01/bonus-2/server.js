const express = require("express");
const app = express();

const port = 3002;

var dataPokemons = require("./dataPokemons.js");

// Route Homepage
app.get("/", (req, res) => {
    res.send("API Pokemons");
})

// Route liste Pokemons
app.get("/pokemons/", (req, res) => {
    res.send(dataPokemons.results);
})

// Route Pokemons id
app.get("/pokemons/:id", (req, res) => {
    let pokemonId = req.params.id;
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})