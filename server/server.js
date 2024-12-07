import express, { response } from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

const SEARCH_HISTORY = new Map(); //Caching the user search history

//Helper function for fetching data from pokeapi
const fetchData = async (url) => {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return response.json();
};

//Function to manage search history cache size to 5
const manageCache = (key, value) => {
    if(SEARCH_HISTORY.size >= 5){
        //Remove the oldest input
        const oldestKey = SEARCH_HISTORY.keys().next().value; //Retrieve the first input from search history
        SEARCH_HISTORY.delete(oldestKey);
        console.log(`Removed oldest entry: ${oldestKey}`);
    }
    //Add the new key-value pair
    SEARCH_HISTORY.set(key, value);

};

//Fetch pokemon data and calculate type effectiveness
app.get('/pokemon/:id', async (req, res) => {
    const pokemonId = req.params.id.toLowerCase();

    //If the requested pokemon is already stored in the search history cache, retrieve it
    if(SEARCH_HISTORY[pokemonId]){
        return res.json(SEARCH_HISTORY.get(pokemonId));
    }

    try {
        //Fetch the pokemon data and type data
        //console.log(`Fetching Pokémon data for: ${pokemonId}`); //Debug
        const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        //console.log(`Fetched Pokémon data:`, pokemonData); //Debug 
        const types = pokemonData.types.map((typeObj) => typeObj.type.name);

        //Fetch type effectiveness data
        const effectivenessPromise = types.map((type) => fetchData(`https://pokeapi.co/api/v2/type/${type}`));
        const effectivenessData = await Promise.all(effectivenessPromise);

        const weakness = new Set(); //Array for storing type that the input pokemon is weak to
        const resistance = new Set(); //Array for storing type that the input pokemon is super effective to
        const immunity = new Set(); //Array for storing type that the input pokemon is immune to

        effectivenessData.forEach((typeData) => {
            if (typeData.damage_relations) {
                if (typeData.damage_relations.double_damage_from) {
                    typeData.damage_relations.double_damage_from.forEach((type) => weakness.add(type.name));
                }
                if (typeData.damage_relations.double_damage_to) {
                    typeData.damage_relations.double_damage_to.forEach((type) => resistance.add(type.name));
                }
                if (typeData.damage_relations.no_damage_from) {
                    typeData.damage_relations.no_damage_from.forEach((type) => immunity.add(type.name));
                }
            } else {
                console.warn(`No damage relations found for type: ${typeData.name}`);
            }
        });

        const result = { //Result form
            name: pokemonData.name, //Name of the pokemon
            type: types, //Types of the pokemon
            weakness: Array.from(weakness),
            resistance: Array.from(resistance),
            immunity: Array.from(immunity),
        };

        //Save it to search history cache
        manageCache(pokemonId, result);
        console.log('Current Search History:', Array.from(SEARCH_HISTORY.entries()));

        return res.json(result);
    }
    catch(error){
        console.error('Error fetching Pokémon data:', error);
        return res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
    }
});

app.listen(PORT, () => {
    console.log(`ExpressJS is listening on port ${PORT}.`)
})


