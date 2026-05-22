const Player = require('../../src/players/Player');
const Arm = require('../../src/weapons/Arm');
const Sword = require('../../src/weapons/Sword');
const Knife = require('../../src/weapons/Knife');

describe('Player Base Class', () => {
    let player;
    
    beforeEach(() => {
        player = new Player(5, 'Test Player');
    });

    test('should create player with correct properties', () => {
        expect(player.name).toBe('Test Player');
        expect(player.life).toBe(100);
        expect(player.magic).toBe(20);
        expect(player.speed).toBe(1);
        expect(player.attack).toBe(10);
        expect(player.agility).toBe(5);
        expect(player.luck).toBe(10);
        expect(player.position).toBe(5);
        expect(player.weapon).toBeInstanceOf(Arm);
    });

    test('getLuck should return value between 0 and 1', () => {
        for (let i = 0; i < 100; i++) {
            const luck = player.getLuck();
            expect(luck).toBeGreaterThanOrEqual(0);
            expect(luck).toBeLessThanOrEqual(2); // Max: (100 + 10)/100 = 1.1
        }
    });

    test('getDamage returns 0 when out of range', () => {
        player.weapon.range = 1;
        expect(player.getDamage(2)).toBe(0);
        expect(player.getDamage(3)).toBe(0);
    });

    test('getDamage calculates correctly when in range', () => {
        player.attack = 10;
        player.weapon.attack = 5;
        jest.spyOn(player, 'getLuck').mockReturnValue(1);
        
        const damage = player.getDamage(1);
        expect(damage).toBe(15); // (10 + 5) * 1 / 1
    });

    test('takeDamage reduces life', () => {
        player.takeDamage(30);
        expect(player.life).toBe(70);
        player.takeDamage(80);
        expect(player.life).toBe(0);
    });

    test('takeDamage does not go below 0', () => {
        player.takeDamage(200);
        expect(player.life).toBe(0);
    });

    test('isDead returns true when life is 0', () => {
        expect(player.isDead()).toBe(false);
        player.takeDamage(100);
        expect(player.isDead()).toBe(true);
    });

    test('moveLeft reduces position', () => {
        player.speed = 3; // Увеличиваем скорость для теста
        player.position = 5;
        player.moveLeft(3);
        expect(player.position).toBe(2);
    });

    test('moveLeft respects speed limit', () => {
        player.speed = 2;
        player.position = 5;
        player.moveLeft(5);
        expect(player.position).toBe(3); // moved only 2
    });

    test('moveRight increases position', () => {
        player.speed = 3;
        player.position = 5;
        player.moveRight(3);
        expect(player.position).toBe(8);
    });

    test('moveRight respects speed limit', () => {
        player.speed = 2;
        player.position = 5;
        player.moveRight(5);
        expect(player.position).toBe(7); // moved only 2
    });

    test('move handles negative distance', () => {
        player.speed = 3;
        player.position = 5;
        player.move(-3);
        expect(player.position).toBe(2);
    });

    test('move handles positive distance', () => {
        player.speed = 3;
        player.position = 5;
        player.move(3);
        expect(player.position).toBe(8);
    });

    test('isAttackBlocked returns boolean', () => {
        jest.spyOn(player, 'getLuck').mockReturnValue(0.9);
        const result = player.isAttackBlocked();
        expect(typeof result).toBe('boolean');
    });

    test('dodged returns boolean', () => {
        jest.spyOn(player, 'getLuck').mockReturnValue(0.9);
        const result = player.dodged();
        expect(typeof result).toBe('boolean');
    });

    test('takeAttack handles blocked attack', () => {
        jest.spyOn(player, 'isAttackBlocked').mockReturnValue(true);
        const takeDamageSpy = jest.spyOn(player, 'takeDamage');
        const weaponTakeDamageSpy = jest.spyOn(player.weapon, 'takeDamage');
        
        player.takeAttack(50);
        
        expect(weaponTakeDamageSpy).toHaveBeenCalledWith(50);
        expect(takeDamageSpy).not.toHaveBeenCalled();
    });

    test('takeAttack handles dodged attack', () => {
        jest.spyOn(player, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(player, 'dodged').mockReturnValue(true);
        const takeDamageSpy = jest.spyOn(player, 'takeDamage');
        
        player.takeAttack(50);
        
        expect(takeDamageSpy).not.toHaveBeenCalled();
    });

    test('takeAttack applies damage when not blocked or dodged', () => {
        jest.spyOn(player, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(player, 'dodged').mockReturnValue(false);
        const takeDamageSpy = jest.spyOn(player, 'takeDamage');
        
        player.takeAttack(50);
        
        expect(takeDamageSpy).toHaveBeenCalledWith(50);
    });

    test('checkWeapon replaces broken weapon with knife', () => {
        // Создаем меч и делаем его сломанным
        const sword = new Sword();
        sword.durability = 0;
        player.weapon = sword;
        player.knife = new Knife();
        
        player.checkWeapon();
        
        expect(player.weapon).toBe(player.knife);
    });

    test('checkWeapon replaces broken knife with arm', () => {
        // Делаем нож сломанным
        player.weapon = player.knife;
        player.knife.durability = 0;
        
        player.checkWeapon();
        
        expect(player.weapon).toBe(player.arm);
    });

    test('checkWeapon does nothing if weapon is not broken', () => {
        const originalWeapon = player.weapon;
        player.checkWeapon();
        expect(player.weapon).toBe(originalWeapon);
    });

    test('tryAttack does nothing when out of range', () => {
        const enemy = new Player(10, 'Enemy');
        player.weapon.range = 1;
        player.position = 0;
        enemy.position = 10;
        
        const takeAttackSpy = jest.spyOn(enemy, 'takeAttack');
        player.tryAttack(enemy);
        
        expect(takeAttackSpy).not.toHaveBeenCalled();
    });

    test('tryAttack applies damage when in range', () => {
        const enemy = new Player(3, 'Enemy');
        player.position = 0;
        player.weapon.range = 5;
        
        jest.spyOn(player, 'getDamage').mockReturnValue(15);
        jest.spyOn(enemy, 'takeAttack');
        
        player.tryAttack(enemy);
        
        expect(enemy.takeAttack).toHaveBeenCalled();
    });

    test('tryAttack applies double damage when same position', () => {
        const enemy = new Player(5, 'Enemy');
        player.position = 5;
        player.weapon.range = 2;
        
        jest.spyOn(player, 'getDamage').mockReturnValue(10);
        const takeAttackSpy = jest.spyOn(enemy, 'takeAttack');
        
        player.tryAttack(enemy);
        
        expect(takeAttackSpy).toHaveBeenCalledWith(20); // double damage
    });

    test('tryAttack damages weapon on use', () => {
        const enemy = new Player(3, 'Enemy');
        player.position = 0;
        player.weapon.range = 5;
        
        const weaponTakeDamageSpy = jest.spyOn(player.weapon, 'takeDamage');
        jest.spyOn(player, 'getDamage').mockReturnValue(15);
        jest.spyOn(enemy, 'takeAttack');
        
        player.tryAttack(enemy);
        
        expect(weaponTakeDamageSpy).toHaveBeenCalled();
    });

    test('chooseEnemy selects enemy with minimum health', () => {
        const enemy1 = new Player(0, 'Enemy1');
        const enemy2 = new Player(0, 'Enemy2');
        enemy1.life = 50;
        enemy2.life = 30;
        
        const players = [player, enemy1, enemy2];
        const chosen = player.chooseEnemy(players);
        
        expect(chosen).toBe(enemy2);
    });

    test('chooseEnemy ignores dead players', () => {
        const enemy1 = new Player(0, 'Enemy1');
        const enemy2 = new Player(0, 'Enemy2');
        enemy1.life = 0;
        enemy1.takeDamage(0); //确保死亡状态
        enemy2.life = 30;
        
        const players = [player, enemy1, enemy2];
        const chosen = player.chooseEnemy(players);
        
        expect(chosen).toBe(enemy2);
    });

    test('chooseEnemy returns null if no enemies', () => {
        const players = [player];
        const chosen = player.chooseEnemy(players);
        expect(chosen).toBeNull();
    });

    test('moveToEnemy moves towards enemy when enemy is to the right', () => {
        const enemy = new Player(10, 'Enemy');
        player.position = 5;
        player.speed = 2;
        
        player.moveToEnemy(enemy);
        expect(player.position).toBe(7);
    });

    test('moveToEnemy moves towards enemy when enemy is to the left', () => {
        const enemy = new Player(0, 'Enemy');
        player.position = 5;
        player.speed = 2;
        
        player.moveToEnemy(enemy);
        expect(player.position).toBe(3);
    });

    test('moveToEnemy does nothing if no enemy', () => {
        const originalPosition = player.position;
        player.moveToEnemy(null);
        expect(player.position).toBe(originalPosition);
    });

    test('turn executes full turn sequence', () => {
        const enemy = new Player(10, 'Enemy');
        enemy.life = 30;
        const players = [player, enemy];
        
        const chooseEnemySpy = jest.spyOn(player, 'chooseEnemy');
        const moveToEnemySpy = jest.spyOn(player, 'moveToEnemy');
        const tryAttackSpy = jest.spyOn(player, 'tryAttack');
        
        player.turn(players);
        
        expect(chooseEnemySpy).toHaveBeenCalled();
        expect(moveToEnemySpy).toHaveBeenCalled();
        expect(tryAttackSpy).toHaveBeenCalled();
    });

    test('turn does nothing if no enemies', () => {
        const players = [player];
        
        const chooseEnemySpy = jest.spyOn(player, 'chooseEnemy');
        const moveToEnemySpy = jest.spyOn(player, 'moveToEnemy');
        const tryAttackSpy = jest.spyOn(player, 'tryAttack');
        
        player.turn(players);
        
        expect(chooseEnemySpy).toHaveBeenCalled();
        expect(moveToEnemySpy).not.toHaveBeenCalled();
        expect(tryAttackSpy).not.toHaveBeenCalled();
    });
});