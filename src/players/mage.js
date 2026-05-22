const Player = require('./Player');
const Staff = require('../weapons/Staff');
const Knife = require('../weapons/Knife');
const Arm = require('../weapons/Arm');

class Mage extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
        this.weaponChain = [this.weapon, new Knife(), new Arm()];
    }

    takeDamage(damage) {
        const magicPercent = this.magic / 100;
        
        if (magicPercent > 0.5) {
            const reducedDamage = damage / 2;
            this.magic = Math.max(0, this.magic - 12);
            super.takeDamage(reducedDamage);
            console.log(`${this.name} использует магический щит! Уменьшенный урон: ${reducedDamage}`);
        } else {
            super.takeDamage(damage);
        }
    }
}

module.exports = Mage;