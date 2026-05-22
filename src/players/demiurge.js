const Mage = require('./Mage');
const StormStaff = require('../weapons/StormStaff');
const Knife = require('../weapons/Knife');
const Arm = require('../weapons/Arm');

class Demiurge extends Mage {
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
        this.weaponChain = [this.weapon, new Knife(), new Arm()];
    }

    getDamage(distance) {
        let damage = super.getDamage(distance);
        
        if (this.magic > 0 && this.getLuck() > 0.6) {
            damage *= 1.5;
            console.log(`${this.name} усиливает атаку божественной силой! Урон: ${damage}`);
        }
        
        return damage;
    }
}

module.exports = Demiurge;