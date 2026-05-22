const Arm = require('../weapons/Arm');
const Knife = require('../weapons/Knife');

/**
 * Базовый класс игрока
 */
class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
        this.knife = new Knife();
        this.arm = new Arm();
        this.weaponChain = ['weapon', 'knife', 'arm'];
    }

    /**
     * Возвращает коэффициент удачливости
     * @returns {number} значение от 0 до 1
     */
    getLuck() {
        const randomNumber = Math.random() * 100;
        return (randomNumber + this.luck) / 100;
    }

    /**
     * Рассчитывает силу удара
     * @param {number} distance - расстояние до цели
     * @returns {number} значение урона
     */
    getDamage(distance) {
        if (distance > this.weapon.range) return 0;
        const weaponDamage = this.weapon.getDamage();
        return (this.attack + weaponDamage) * this.getLuck() / distance;
    }

    /**
     * Получает урон
     * @param {number} damage - полученный урон
     */
    takeDamage(damage) {
        this.life = Math.max(0, this.life - damage);
        console.log(`${this.name} получает ${damage} урона. Осталось жизней: ${this.life}`);
    }

    /**
     * Проверяет, мёртв ли игрок
     * @returns {boolean} true если мёртв
     */
    isDead() {
        return this.life === 0;
    }

    /**
     * Движение влево
     * @param {number} distance - дистанция движения
     */
    moveLeft(distance) {
        const actualDistance = Math.min(distance, this.speed);
        this.position = Math.max(0, this.position - actualDistance);
        console.log(`${this.name} двигается влево на ${actualDistance}. Позиция: ${this.position}`);
    }

    /**
     * Движение вправо
     * @param {number} distance - дистанция движения
     */
    moveRight(distance) {
        const actualDistance = Math.min(distance, this.speed);
        this.position += actualDistance;
        console.log(`${this.name} двигается вправо на ${actualDistance}. Позиция: ${this.position}`);
    }

    /**
     * Движение в заданном направлении
     * @param {number} distance - дистанция (отрицательная - влево)
     */
    move(distance) {
        if (distance < 0) {
            this.moveLeft(Math.abs(distance));
        } else {
            this.moveRight(distance);
        }
    }

    /**
     * Проверяет, заблокирована ли атака
     * @returns {boolean} true если заблокирована
     */
    isAttackBlocked() {
        const result = this.getLuck() > (100 - this.luck) / 100;
        if (result) console.log(`${this.name} блокирует атаку!`);
        return result;
    }

    /**
     * Проверяет, уклонился ли игрок
     * @returns {boolean} true если уклонился
     */
    dodged() {
        const chance = (100 - this.agility - this.speed * 3) / 100;
        const result = this.getLuck() > chance;
        if (result) console.log(`${this.name} уклоняется от атаки!`);
        return result;
    }

    /**
     * Принимает атаку
     * @param {number} damage - сила атаки
     */
    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.weapon.takeDamage(damage);
            console.log(`${this.name} блокирует удар оружием!`);
            return;
        }
        
        if (this.dodged()) {
            console.log(`${this.name} уклоняется от удара!`);
            return;
        }
        
        this.takeDamage(damage);
    }

    /**
     * Проверяет и заменяет сломанное оружие
     */
    checkWeapon() {
        if (this.weapon.isBroken()) {
            if (this.weaponChain.includes('knife') && this.weapon !== this.knife) {
                console.log(`${this.name} достаёт нож!`);
                this.weapon = this.knife;
            } else if (this.weaponChain.includes('arm') && this.weapon !== this.arm) {
                console.log(`${this.name} дерётся голыми руками!`);
                this.weapon = this.arm;
            }
        }
    }

    /**
     * Атакует противника
     * @param {Player} enemy - цель атаки
     */
    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);
        
        if (distance > this.weapon.range) {
            console.log(`${this.name} не может атаковать ${enemy.name} - слишком далеко!`);
            return;
        }
        
        this.weapon.takeDamage(10 * this.getLuck());
        
        let damage = this.getDamage(distance);
        
        if (this.position === enemy.position) {
            damage *= 2;
            console.log(`${this.name} атакует в упор! Урон удвоен!`);
            if (enemy.position > 0) {
                enemy.moveRight(1);
                console.log(`${enemy.name} отскакивает на позицию ${enemy.position}`);
            }
        }
        
        console.log(`${this.name} атакует ${enemy.name} с уроном ${damage}`);
        enemy.takeAttack(damage);
        this.checkWeapon();
    }

    /**
     * Выбирает противника с минимальным здоровьем
     * @param {Array<Player>} players - список игроков
     * @returns {Player|null} выбранный противник
     */
    chooseEnemy(players) {
        const alivePlayers = players.filter(p => !p.isDead() && p !== this);
        if (alivePlayers.length === 0) return null;
        
        return alivePlayers.reduce((min, player) => 
            player.life < min.life ? player : min
        );
    }

    /**
     * Двигается к противнику
     * @param {Player} enemy - цель движения
     */
    moveToEnemy(enemy) {
        if (!enemy) return;
        const distance = enemy.position - this.position;
        if (Math.abs(distance) > 0) {
            this.move(distance > 0 ? this.speed : -this.speed);
        }
    }

    /**
     * Совершает ход
     * @param {Array<Player>} players - все игроки
     */
    turn(players) {
        const enemy = this.chooseEnemy(players);
        if (!enemy) return;
        
        this.moveToEnemy(enemy);
        this.tryAttack(enemy);
    }
}

module.exports = Player;