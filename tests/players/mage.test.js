const Mage = require('../../src/players/Mage');
const Staff = require('../../src/weapons/Staff');

describe('Mage Class', () => {
    let mage;
    
    beforeEach(() => {
        mage = new Mage(5, 'Test Mage');
    });

    test('should have correct initial properties', () => {
        expect(mage.life).toBe(70);
        expect(mage.magic).toBe(100);
        expect(mage.attack).toBe(5);
        expect(mage.agility).toBe(8);
        expect(mage.description).toBe('Маг');
        expect(mage.weapon).toBeInstanceOf(Staff);
    });

    test('takeDamage reduces damage by half when magic > 50', () => {
        mage.magic = 80;
        jest.spyOn(mage, 'getLuck').mockReturnValue(0.5);
        
        mage.takeDamage(50);
        
        expect(mage.life).toBe(45); // 70 - 25 (half of 50)
        expect(mage.magic).toBe(68); // 80 - 12
    });

    test('takeDamage does not reduce when magic <= 50', () => {
        mage.magic = 40;
        jest.spyOn(mage, 'getLuck').mockReturnValue(0.5);
        
        mage.takeDamage(30);
        
        expect(mage.life).toBe(40);
        expect(mage.magic).toBe(40);
    });
});