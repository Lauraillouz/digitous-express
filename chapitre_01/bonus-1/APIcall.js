const axios = require("axios");


let countriesNames = [];

function getCountries() {
    axios.get("http://localhost:3001/countries/").then((res) => {
        let countries = res.data;
        countriesNames = countries.map(function (country) {
            return country.name;
        })
        console.log(countriesNames.join(" - "));
    })
}
getCountries();