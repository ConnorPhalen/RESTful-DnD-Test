/*
** CRUDTest class to run small testing operations on the Spell Entity as it relates to CRUD operations
**
** Helpful Sources: 
**      Basic CRUD functions (Repository): https://levelup.gitconnected.com/complete-guide-to-using-typeorm-and-typescript-for-data-persistence-in-node-js-module-bfce169959d9
**      Quick getManager() information: https://www.tutorialspoint.com/typeorm/typeorm_working_with_entity_manager.htm
*/
import { EntityRepository, Repository, getRepository, getManager } from "typeorm";
import {Spell} from "./Spell";
import * as util from 'util';

@EntityRepository(Spell)
export class SpellTesterRepo extends Repository<Spell> {

    // Create and return a generic test spell
    async getGenericSpell(): Promise<Spell>{
        let newSpell = new Spell();

        newSpell.spellIndex  = "test-spell";
        newSpell.spellName   = "Test Spell";
        newSpell.description = "Generic Spell to test CRUD functionality.";
        newSpell.components  = "VS";
        newSpell.ritual      = false;
        newSpell.duration    = "Some amount of time";
        newSpell.concentration = false;
        newSpell.castingTime = "1 action";
        newSpell.attackType  = "ranged";
        newSpell.magicSchool = "Transmutation";
        newSpell.classReq    = "Wizard";

        return newSpell;
    }





    // Create a database entry for a spell
    async createSpell(spell: Spell){
        await getManager().save(spell);
    }
    
    // Read a spell from the database
    async readSpell(spIndex: string): Promise<Spell>{
        return getRepository(Spell)
          .createQueryBuilder("spell")
          .where("spell.spellIndex like :index", { index:`%${spIndex}%` })
          .getOne();
    }

    // Update a spell from the database 
    // (Helpful: https://stackoverflow.com/a/57775019)
    async updateSpell(spellU: Spell, spellID: number){
        await getRepository(Spell).update(spellID, spellU);
    }
    
    // Delete a spell from the database w/ spell ID
    async deleteSpellByID(id: number){
        await getManager().delete(Spell, id);
    }

    // Delete a spell from the database w/ entire spell
    async deleteSpell(spell: Spell){
        await getManager().remove(spell);
    }
}