import "reflect-metadata";
import {createConnection} from "typeorm";
import {Spell} from "./entity/Spell";
import {request} from 'http';

// Setup variables
const axios = require('axios');
let apiPath = 'https://www.dnd5eapi.co/api/spells/';
let spellName = 'acid-arrow';
let spell = new Spell();


console.log("Getting spells from DnD API...");
axios.get(apiPath)
    .then(function(response){
        // handle success
        response.data.results.forEach( (element) => {
            // Retrieve data for each specific spell
            axios.get(apiPath + element.index)
                .then(function(response){
                    console.log('Adding ' + element.name + ' to Database');

                })
                .catch(function(error){
                    console.log(error);
                    console.log('GET request failed to retrieve spell');
                });
        });

    })
    .catch(function(error){
        // handle error
        console.log(error);
        console.log('GET request failed to retrieve list');
    });



/* Create Connection to MySQL Database and 
createConnection().then(async connection => {

    console.log("Inserting a new spell into the database...");
    const spell = new Spell();
    spell.spellName = "TEST";
    spell.description = "LOTTA TEST";
    spell.range = 30;
    await connection.manager.save(spell);
    console.log("Saved a new spell with id: " + spell.id);

    console.log("Loading spells from the database...");
    const spells = await connection.manager.find(Spell);
    console.log("Loaded spells: ", spells);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
*/