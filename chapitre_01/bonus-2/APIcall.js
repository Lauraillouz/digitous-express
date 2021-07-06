const axios = require("axios");

function catchPokemon(id) {
    axios.get(`http://localhost:3002/pokemons/${id}`).then((res) => {
        let pokemon = res.data;
        let pokemonId = pokemon.map(function (pokemonId) {
            return pokemonId.url;
        })
        console.log(pokemonId);
    });
}
catchPokemon();