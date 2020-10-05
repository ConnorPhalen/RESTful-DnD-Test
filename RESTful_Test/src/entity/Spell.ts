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
        default: "N/A"
    })
    spellIndex: string;

    @Column({
        default: "N/A"
    })
    spellName: string;

    @Column({
        length: 4096,
        default: "N/A"
    })
    description: string;

    @Column({
        length: 2048,
        default: "N/A"
    })
    higherLevel: string;

    @Column({
        default: 0
    })
    range: string;

    @Column({
        default: "N/A"
    })
    components: string;

    @Column({
        length: 1024,
        default: "N/A"
    })
    material: string;

    @Column({
        default: false
    })
    ritual: boolean;

    @Column({
        default: "0"
    })
    duration: string;

    @Column({
        default: false
    })
    concentration: boolean;

    @Column({
        default: "N/A"
    })
    castingTime: string;

    @Column({
        default: 0
    })
    spellLevel: number;

    @Column({
        default: "ranged"
    })
    attackType: string;

    @Column({
        type: "enum",
        enum: DamageType,
        default: DamageType.BLUDGEONING
    })
    damageType: DamageType;

    @Column({
        default: "N/A"
    })
    damageAtSlotLevel: string;

    @Column({
        default: "N/A"
    })
    dcType: string;

    @Column({
        default: "N/A"
    })
    dcSuccess: string;

    @Column({
        length: 2048,
        default: "N/A"
    })
    dcDesc: string;

    @Column({
        default: "N/A"
    })
    aoeType: string;

    @Column({
        default: 0
    })
    aoeSize: number;

    @Column({
        type: "enum",
        enum: MagicSchool,
        default: MagicSchool.EVOCATION
    })
    magicSchool: MagicSchool;

    @Column({
        default: "Fighter"
    })
    classReq: string;
    // Columns End
}