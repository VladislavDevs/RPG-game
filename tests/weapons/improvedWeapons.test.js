const LongBow = require('../../src/weapons/LongBow');
const Axe = require('../../src/weapons/Axe');
const StormStaff = require('../../src/weapons/StormStaff');

describe('LongBow Class', () => {
    test('should be improved version of Bow', () => {
        const longBow = new LongBow();
        expect(longBow.name).toBe('Длинный лук');
        expect(longBow.attack).toBe(15);
        expect(longBow.range).toBe(4);
        expect(longBow.durability).toBe(200);
    });
});

describe('Axe Class', () => {
    test('should be improved version of Sword', () => {
        const axe = new Axe();
        expect(axe.name).toBe('Секира');
        expect(axe.attack).toBe(27);
        expect(axe.durability).toBe(800);
        expect(axe.initDurability).toBe(800);
        expect(axe.range).toBe(1);
    });
});

describe('StormStaff Class', () => {
    test('should be improved version of Staff', () => {
        const stormStaff = new StormStaff();
        expect(stormStaff.name).toBe('Посох Бури');
        expect(stormStaff.attack).toBe(10);
        expect(stormStaff.range).toBe(3);
        expect(stormStaff.durability).toBe(300);
    });
});