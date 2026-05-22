const Archer = require('../../src/players/Archer');
const Bow = require('../../src/weapons/Bow');

describe('Archer Class', () => {
    let archer;
    
    beforeEach(() => {
        archer = new Archer(5, 'Test Archer');
    });

    test('should have correct initial properties', () => {
        expect(archer.life).toBe(80);
        expect(archer.magic).toBe(35);
        expect(archer.attack).toBe(5);
        expect(archer.agility).toBe(10);
        expect(archer.description).toBe('Лучник');
        expect(archer.weapon).toBeInstanceOf(Bow);
    });

    test('getDamage uses special formula', () => {
        archer.attack = 5;
        archer.weapon.attack = 10;
        archer.weapon.range = 3;
        jest.spyOn(archer, 'getLuck').mockReturnValue(1);
        
        const damage = archer.getDamage(2);
        // (5 + 10) * 1 * 2 / 3 = 10
        expect(damage).toBe(10);
    });

    test('getDamage returns 0 when out of range', () => {
        archer.weapon.range = 3;
        expect(archer.getDamage(4)).toBe(0);
    });
});