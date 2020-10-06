import "reflect-metadata";
import {createConnection} from "typeorm";
import {getManager} from "typeorm";
import {getRepository} from "typeorm";
import {Spell} from "./entity/Spell";
import {SpellTesterRepo} from "./entity/TestRepo";
import {request} from 'http';

// Setup variables
const axios = require('axios');
let apiPath = 'https://www.dnd5eapi.co/api/spells/';

//** Start Script
// Create Connection to MySQL Database and retireve all spells from DnD API
createConnection().then(async connection => {

    // Setup Test vars
    console.log("Starting Spell Entity CRUD Test...");
    let spellTestR = new SpellTesterRepo();
    let testSpell = await spellTestR.getGenericSpell();

    // Create Spell DB Entry
    console.log("CREATE TEST...");
    await spellTestR.createSpell(testSpell);

    // Read Spell
    let testSpell2 = await spellTestR.readSpell(testSpell.spellIndex);
    console.log("READ TEST...");
    console.log(testSpell2);

    // Update Spell
    console.log("UPDATE TEST...");
    testSpell2.spellIndex = "sample-spell";
    testSpell2.spellName = "Sample Spell";
    testSpell2.description = "This text should be different than before.";
    testSpell2.ritual = true;
    testSpell2.magicSchool = "Hogwarts";
    testSpell2.classReq = "That Potter Kid";
    await spellTestR.updateSpell(testSpell2, testSpell2.id);

    // Re-read Spell
    let testSpell3 = await spellTestR.readSpell(testSpell2.spellIndex);
    console.log(testSpell3);

    // Delete Spell
    console.log("DELETE TEST...");
    await spellTestR.deleteSpellByID(testSpell3.id);

    // Attempt Spell retrieval
    let testSpell4 = await spellTestR.readSpell(testSpell3.spellIndex);
    console.log(testSpell4);
    console.log("Ending Spell Entity CRUD Test...");

    console.log("Starting DnD API Spell Retrieval Test...");
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
                        console.log(result.spellName + ' already exists. Skipping...');
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
                                newspell.magicSchool = spellRet.data.school.name;
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

    console.log("Ending DnD API Spell Retrieval Test...");
}).catch(error => console.log(error));
