const StarWarsAPI = require('star-wars-api');
swapi = new StarWarsAPI;

/*swapi.describe()
    .then(console.log);*/

swapi.get('starships', [9, 10])
    .then(console.log);

/*
const Pokedex = require('pokedex-promise-v2');
const options = {
    protocol: 'https',
    hostName: 'localhost:443',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
};

const P = new Pokedex(options);

let randomID = Math.floor(Math.random() * 949);
console.log(randomID);

P.getPokemonByName(randomID, function(response, error) { // with callback
    if(!error) {
        console.log(response);
    } else {
        console.log(error)
    }
});

P.getPokemonsList() // with Promise
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });

P.getPokemonByName('eevee') // with Promise
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });*/


