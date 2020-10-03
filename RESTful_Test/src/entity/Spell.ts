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

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    spellName: string;

    @Column()
    description: string;

    @Column()
    higherLevel: string;

    @Column()
    range: number;

    @Column()
    components: string;

    @Column()
    material: string;

    @Column()
    ritual: bool;

    @Column()
    duration: number;

    @Column()
    concentration: bool;

    @Column()
    castingTime: string;

    @Column()
    spellLevel: number;

    @Column({
        type: "enum",
        enum: DamageType,
        default: DamageType.BLUDGEONING
    })
    attackType: DamageType;

    @Column()
    damageAtSlotLevel: string;

    @Column({
        type: "enum",
        enum: MagicSchool,
        default: MagicSchool.EVOCATION
    })
    attackType: MagicSchool;

    @Column({
        type: "enum",
        enum: Class,
        default: Class.FIGHTER
    })
    attackType: Class;

}