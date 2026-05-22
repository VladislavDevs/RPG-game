const Player = require('./Player');
const Bow = require('../weapons/Bow');
const Knife = require('../weapons/Knife');
const Arm = require('../weapons/Arm');

class Archer extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 35;
        this.attack = 5;
        this.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow();
        this.weaponChain = [this.weapon, new Knife(), new Arm()];
    }

    getDamage(distance) {
        if (distance > this.weapon.range) return 0;
        const weaponDamage = this.weapon.getDamage();
        return (this.attack + weaponDamage) * this.getLuck() * distance / this.weapon.range;
    }
}

module.exports = Archer;