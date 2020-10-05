import "reflect-metadata";
import {createConnection} from "typeorm";
import {getManager} from "typeorm";
import {getRepository} from "typeorm";
import {Spell} from "./entity/Spell";
import {request} from 'http';

// Setup variables
const axios = require('axios');
let apiPath = 'https://www.dnd5eapi.co/api/spells/';
let spellName = 'acid-arrow';
let spell = new Spell();



// Create Connection to MySQL Database and retireve all spells from DnD API
createConnection().then(async connection => {

    console.log("Getting spells from DnD API...");
    axios.get(apiPath)
        .then(function(response){
            // handle success
            response.data.results.forEach( (element) => {
                // Check if spell is already stored (https://stackoverflow.com/a/47832612)
                var value = getRepository(Spell)
                  .createQueryBuilder("spell")
                  .where("spell.spellIndex like :index", { index:`%${element.index}%` })
                  .getOne();

                value.then(function(result) { // return Promise results
                    if(result){
                        // do nothing as entry already exists
                        console.log(result + ' already exists. Skipping...');
                    }
                    else{
                        // Retrieve and store data for this spell
                        axios.get(apiPath + element.index)
                        //axios.get(apiPath + 'blight')
                            .then(function(spellRet){
                                console.log('Adding ' + spellRet.data.name + ' to Database');

                                //****TODO: Create a Helper/Etc. function to streamline this code
                                let newspell = new Spell();
                                //console.log(spellRet.data);

                                newspell.spellIndex = spellRet.data.index;
                                newspell.spellName = spellRet.data.name;

                                spellRet.data.desc.forEach( (comp) => {
                                    newspell.description += comp;
                                    newspell.description += " ";
                                });
                                try{
                                    spellRet.data.higher_level.forEach( (comp) => {
                                        newspell.higherLevel += comp;
                                        newspell.higherLevel += " - ";
                                    });
                                } catch(ex){
                                    //console.log("UNDEFINED, SKIPPING...");
                                }
                                newspell.range = spellRet.data.range;

                                spellRet.data.components.forEach( (comp) => {
                                    newspell.components += comp;
                                });
                                newspell.material = spellRet.data.material;
                                newspell.ritual = spellRet.data.ritual;
                                newspell.duration = spellRet.data.duration;
                                newspell.concentration = spellRet.data.concentration;
                                newspell.castingTime = spellRet.data.casting_time;
                                newspell.attackType = spellRet.data.attack_type;

                                try{
                                    newspell.damageType = spellRet.data.damage.damage_type.name;
                            //newspell.damageAtSlotLevel = spellRet.data.damage.damage_at_slot_level;
                                } catch(ex){
                                    //console.log("UNDEFINED, SKIPPING...");
                                }                    
                                try{
                                    newspell.dcType = spellRet.data.dc.dc_type.name;
                                    newspell.dcSuccess = spellRet.data.dc.dc_success;
                                    newspell.dcDesc = spellRet.data.dc.desc;
                                } catch(ex){
                                    //console.log("UNDEFINED, SKIPPING...");
                                }
                                try{
                                    newspell.aoeType = spellRet.data.area_of_effect.type;
                                    newspell.aoeSize = spellRet.data.area_of_effect.size;
                                } catch(ex){
                                    //console.log("UNDEFINED, SKIPPING...");
                                }
                                spell.magicSchool = spellRet.data.school.name;
                                spellRet.data.classes.forEach( (comp) => {
                                    newspell.classReq += comp.name;
                                    newspell.classReq += " - ";
                                });

                                connection.manager.save(newspell);
                            })
                            .catch(function(error){
                                console.log(error);
                                console.log('GET request failed to retrieve spell');
                            });
                    } // end else
                })
            });
        })
        .catch(function(error){
            // handle error
            console.log(error);
            console.log('GET request failed to retrieve list');
        });


    // Read, Update, Read, and Delete a Spell

/*
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
*/
}).catch(error => console.log(error));





/* Quick Database Check Function (https://github.com/typeorm/typeorm/issues/2425#issuecomment-401288445)
public async checkAtLeastOne(value: string): Promise<boolean> {
    const result = await getConnection()
        .getRepository(Entity)
        .createQueryBuilder('entity')
        .where('entity.value= :value', { value: value})
        .getMany();
    return result.length >= 1;
}*/
