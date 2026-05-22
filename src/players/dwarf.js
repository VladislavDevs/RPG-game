const Warrior = require('./Warrior');
const Axe = require('../weapons/Axe');
const Knife = require('../weapons/Knife');
const Arm = require('../weapons/Arm');

class Dwarf extends Warrior {
    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.weaponChain = [this.weapon, new Knife(), new Arm()];
        this.attackCounter = 0;
    }

    takeDamage(damage) {
        this.attackCounter++;
        
        if (this.attackCounter % 6 === 0 && this.getLuck() > 0.5) {
            const reducedDamage = damage / 2;
            console.log(`${this.name} отражает каждый шестой удар! Урон уменьшен вдвое`);
            super.takeDamage(reducedDamage);
        } else {
            super.takeDamage(damage);
        }
    }
}

module.exports = Dwarf;