import "reflect-metadata";
import {createConnection} from "typeorm";
import {Spell} from "./entity/Spell";

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
