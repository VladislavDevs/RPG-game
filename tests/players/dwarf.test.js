const Dwarf = require('../../src/players/Dwarf');
const Axe = require('../../src/weapons/Axe');

describe('Dwarf Class', () => {
    let dwarf;
    
    beforeEach(() => {
        dwarf = new Dwarf(5, 'Test Dwarf');
    });

    test('should have correct initial properties', () => {
        expect(dwarf.life).toBe(130);
        expect(dwarf.attack).toBe(15);
        expect(dwarf.luck).toBe(20);
        expect(dwarf.description).toBe('Гном');
        expect(dwarf.weapon).toBeInstanceOf(Axe);
    });

    test('takeDamage reduces every 6th hit by half with good luck', () => {
        jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.6);
        
        for (let i = 1; i <= 5; i++) {
            dwarf.takeDamage(10);
        }
        expect(dwarf.life).toBe(80);
        
        const damageSpy = jest.spyOn(dwarf, 'takeDamage');
        dwarf.takeDamage(10);
        expect(dwarf.life).toBe(75);
    });

    test('takeDamage normal on 6th hit when luck is low', () => {
        dwarf.life = 130;
        jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.4);
        
        for (let i = 1; i <= 5; i++) {
            dwarf.takeDamage(10);
        }
        expect(dwarf.life).toBe(80);
        
        dwarf.takeDamage(10);
        expect(dwarf.life).toBe(70);
    });
});