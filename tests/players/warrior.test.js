const Warrior = require('../../src/players/Warrior');
const Sword = require('../../src/weapons/Sword');

describe('Warrior Class', () => {
    let warrior;
    
    beforeEach(() => {
        warrior = new Warrior(5, 'Test Warrior');
    });

    test('should have correct initial properties', () => {
        expect(warrior.life).toBe(120);
        expect(warrior.speed).toBe(2);
        expect(warrior.description).toBe('Воин');
        expect(warrior.weapon).toBeInstanceOf(Sword);
    });

    test('takeDamage uses magic when low health and high luck', () => {
        warrior.life = 50; // less than 50%
        warrior.magic = 20;
        jest.spyOn(warrior, 'getLuck').mockReturnValue(0.9);
        
        warrior.takeDamage(15);
        
        expect(warrior.magic).toBe(5); // used 15 magic
        expect(warrior.life).toBe(50); // health unchanged
    });

    test('takeDamage uses health when magic is insufficient', () => {
        warrior.life = 50;
        warrior.magic = 5;
        jest.spyOn(warrior, 'getLuck').mockReturnValue(0.9);
        
        warrior.takeDamage(15);
        
        expect(warrior.magic).toBe(0);
        expect(warrior.life).toBe(40); // 50 - 10 (remaining damage)
    });

    test('takeDamage normal when health above 50%', () => {
        warrior.life = 80;
        warrior.magic = 20;
        jest.spyOn(warrior, 'getLuck').mockReturnValue(0.9);
        
        warrior.takeDamage(30);
        
        expect(warrior.life).toBe(50);
        expect(warrior.magic).toBe(20);
    });

    test('takeDamage normal when luck is low', () => {
        warrior.life = 50;
        warrior.magic = 20;
        jest.spyOn(warrior, 'getLuck').mockReturnValue(0.5);
        
        warrior.takeDamage(30);
        
        expect(warrior.life).toBe(20);
        expect(warrior.magic).toBe(20);
    });
});