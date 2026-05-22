const Weapon = require('../../src/weapons/Weapon');
const Arm = require('../../src/weapons/Arm');
const Bow = require('../../src/weapons/Bow');
const Sword = require('../../src/weapons/Sword');
const Knife = require('../../src/weapons/Knife');
const Staff = require('../../src/weapons/Staff');

describe('Weapon Base Class', () => {
    test('should create weapon with correct properties', () => {
        const weapon = new Weapon('Test Weapon', 50, 100, 2);
        expect(weapon.name).toBe('Test Weapon');
        expect(weapon.attack).toBe(50);
        expect(weapon.durability).toBe(100);
        expect(weapon.initDurability).toBe(100);
        expect(weapon.range).toBe(2);
    });

    test('takeDamage should reduce durability', () => {
        const weapon = new Weapon('Test', 10, 100, 1);
        weapon.takeDamage(30);
        expect(weapon.durability).toBe(70);
        weapon.takeDamage(80);
        expect(weapon.durability).toBe(0);
    });

    test('takeDamage should not go below 0', () => {
        const weapon = new Weapon('Test', 10, 50, 1);
        weapon.takeDamage(100);
        expect(weapon.durability).toBe(0);
    });

    test('getDamage returns full damage when durability > 30%', () => {
        const weapon = new Weapon('Test', 100, 100, 1);
        expect(weapon.getDamage()).toBe(100);
        
        weapon.takeDamage(60);
        expect(weapon.durability).toBe(40);
        expect(weapon.getDamage()).toBe(100); // 40 >= 30% of 100
    });

    test('getDamage returns half damage when durability <= 30%', () => {
        const weapon = new Weapon('Test', 100, 100, 1);
        weapon.takeDamage(71);
        expect(weapon.durability).toBe(29);
        expect(weapon.getDamage()).toBe(50); // half damage
    });

    test('getDamage returns 0 when broken', () => {
        const weapon = new Weapon('Test', 100, 100, 1);
        weapon.takeDamage(100);
        expect(weapon.getDamage()).toBe(0);
    });

    test('isBroken returns true when durability is 0', () => {
        const weapon = new Weapon('Test', 10, 10, 1);
        expect(weapon.isBroken()).toBe(false);
        weapon.takeDamage(10);
        expect(weapon.isBroken()).toBe(true);
    });
});

describe('Arm Class', () => {
    test('should have infinite durability', () => {
        const arm = new Arm();
        expect(arm.name).toBe('Рука');
        expect(arm.attack).toBe(1);
        expect(arm.durability).toBe(Infinity);
        expect(arm.range).toBe(1);
        
        arm.takeDamage(1000);
        expect(arm.durability).toBe(Infinity);
        expect(arm.isBroken()).toBe(false);
    });
});

describe('Bow Class', () => {
    test('should create bow with correct properties', () => {
        const bow = new Bow();
        expect(bow.name).toBe('Лук');
        expect(bow.attack).toBe(10);
        expect(bow.durability).toBe(200);
        expect(bow.range).toBe(3);
    });
});

describe('Sword Class', () => {
    test('should create sword with correct properties', () => {
        const sword = new Sword();
        expect(sword.name).toBe('Меч');
        expect(sword.attack).toBe(25);
        expect(sword.durability).toBe(500);
        expect(sword.range).toBe(1);
    });
});

describe('Knife Class', () => {
    test('should create knife with correct properties', () => {
        const knife = new Knife();
        expect(knife.name).toBe('Нож');
        expect(knife.attack).toBe(5);
        expect(knife.durability).toBe(300);
        expect(knife.range).toBe(1);
    });
});

describe('Staff Class', () => {
    test('should create staff with correct properties', () => {
        const staff = new Staff();
        expect(staff.name).toBe('Посох');
        expect(staff.attack).toBe(8);
        expect(staff.durability).toBe(300);
        expect(staff.range).toBe(2);
    });
});