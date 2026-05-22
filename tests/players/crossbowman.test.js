const Crossbowman = require('../../src/players/Crossbowman');
const LongBow = require('../../src/weapons/LongBow');

describe('Crossbowman Class', () => {
    let crossbowman;
    
    beforeEach(() => {
        crossbowman = new Crossbowman(5, 'Test Crossbowman');
    });

    test('should have correct initial properties', () => {
        expect(crossbowman.life).toBe(85);
        expect(crossbowman.attack).toBe(8);
        expect(crossbowman.agility).toBe(20);
        expect(crossbowman.luck).toBe(15);
        expect(crossbowman.description).toBe('Арбалетчик');
        expect(crossbowman.weapon).toBeInstanceOf(LongBow);
    });
});