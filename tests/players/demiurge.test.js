const Demiurge = require('../../src/players/Demiurge');
const StormStaff = require('../../src/weapons/StormStaff');

describe('Demiurge Class', () => {
    let demiurge;
    
    beforeEach(() => {
        demiurge = new Demiurge(5, 'Test Demiurge');
    });

    test('should have correct initial properties', () => {
        expect(demiurge.life).toBe(80);
        expect(demiurge.magic).toBe(120);
        expect(demiurge.attack).toBe(6);
        expect(demiurge.luck).toBe(12);
        expect(demiurge.description).toBe('Демиург');
        expect(demiurge.weapon).toBeInstanceOf(StormStaff);
    });

    test('getDamage deals 1.5x damage when magic > 0 and luck > 0.6', () => {
        demiurge.magic = 50;
        demiurge.attack = 6;
        demiurge.weapon.attack = 10;
        jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.7);
        
        const normalDamage = (6 + 10) * 0.7 / 1;
        const expectedDamage = normalDamage * 1.5;
        
        expect(demiurge.getDamage(1)).toBeCloseTo(expectedDamage);
    });

    test('getDamage normal when luck is low', () => {
        demiurge.magic = 50;
        jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.5);
        
        const damage = demiurge.getDamage(1);
        expect(damage).toBeLessThan(25);
    });
});