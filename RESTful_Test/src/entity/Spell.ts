/*
** Spell Entity for storing data retrieved from the DnD API outlined in the README file.
**
** Helpful Sources: 
**      Basic CRUD functions (Repository): https://levelup.gitconnected.com/complete-guide-to-using-typeorm-and-typescript-for-data-persistence-in-node-js-module-bfce169959d9
*/
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum DamageType {
    SLASHING = "Slashing",
    PIERCING = "Piercing",
    BLUDGEONING = "Bludgeoning",
    POISON = "Poison",
    ACID = "Acid",
    FIRE = "Fire",
    COLD = "Cold",
    RADIANT = "Radiant",
    NECROTIC = "Necrotic",
    LIGHTNING = "Lightning",
    THUNDER = "Thunder",
    FORCE = "Force",
    PSYCHIC = "Psychic"
}

export enum MagicSchool {
    CONJURATION = "Conjuration",
    NECROMANCY = "Necromancy",
    EVOCATION = "Evocation",
    ABJURATION = "Abjuration",
    TRANSMUTATION = "Transmutation",
    DIVINATION = "Divination",
    ECHANTMENT = "Enchantment",
    ILLUSION = "Illusion"
}

export enum Class {
    BARBARIAN = "Barbarian",
    BARD = "Bard",
    CLERIC = "Cleric",
    DRUID = "Druid",
    FIGHTER = "Fighter",
    MONK = "Monk",
    PALADIN = "Paladin",
    RANGER = "Ranger",
    ROGUE = "Rogue",
    SORCERER = "Sorcerer",
    WARLOCK = "Warlock",
    WIZARD = "Wizard",
    ARTIFICER = "Artificer"
}

@Entity()
export class Spell {
    // Functions Start
    // Functions End

    // Columns Start
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: "Empty"
    })
    spellIndex: string;

    @Column({
        default: "Empty"
    })
    spellName: string;

    @Column({
        default: "Empty"
    })
    description: string;

    @Column({
        default: "Empty"
    })
    higherLevel: string;

    @Column({
        default: 0
    })
    range: number;

    @Column({
        default: "Empty"
    })
    components: string;

    @Column({
        default: "Empty"
    })
    material: string;

    @Column({
        default: false
    })
    ritual: boolean;

    @Column({
        default: 0
    })
    duration: number;

    @Column({
        default: false
    })
    concentration: boolean;

    @Column({
        default: "Empty"
    })
    castingTime: string;

    @Column({
        default: 0
    })
    spellLevel: number;

    @Column({
        type: "enum",
        enum: DamageType,
        default: DamageType.BLUDGEONING
    })
    attackType: DamageType;

    @Column({
        default: "Empty"
    })
    damageAtSlotLevel: string;

    @Column({
        type: "enum",
        enum: MagicSchool,
        default: MagicSchool.EVOCATION
    })
    magicSchool: MagicSchool;

    @Column({
        type: "enum",
        enum: Class,
        default: Class.FIGHTER
    })
    classReq: Class;
    // Columns End
}