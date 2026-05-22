const Player = require('./Player');
const Sword = require('../weapons/Sword');
const Knife = require('../weapons/Knife');
const Arm = require('../weapons/Arm');

class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 120;
        this.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
        this.weaponChain = [this.weapon, new Knife(), new Arm()];
    }

    takeDamage(damage) {
        const lifePercent = this.life / 120;
        const luckValue = this.getLuck();
        
        if (lifePercent < 0.5 && luckValue > 0.8 && this.magic > 0) {
            const magicDamage = Math.min(damage, this.magic);
            this.magic -= magicDamage;
            const remainingDamage = damage - magicDamage;
            if (remainingDamage > 0) {
                super.takeDamage(remainingDamage);
            }
            console.log(`${this.name} использует магию для защиты! Осталось маны: ${this.magic}`);
        } else {
            super.takeDamage(damage);
        }
    }
}

module.exports = Warrior;