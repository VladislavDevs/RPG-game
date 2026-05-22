const GameEngine = require('../../src/game/GameEngine');
const Warrior = require('../../src/players/Warrior');
const Archer = require('../../src/players/Archer');

describe('GameEngine', () => {
    test('should create game with players', () => {
        const players = [new Warrior(0, 'Warrior'), new Archer(5, 'Archer')];
        const game = new GameEngine(players);
        
        expect(game.players).toHaveLength(2);
        expect(game.round).toBe(1);
    });

    test('start should return winner', () => {
        const warrior = new Warrior(0, 'Warrior');
        const archer = new Archer(5, 'Archer');
        
        // Make archer weak
        archer.life = 1;
        
        const game = new GameEngine([warrior, archer]);
        const winner = game.start();
        
        expect(winner).toBeDefined();
        expect(winner.isDead()).toBe(false);
    });

    test('playRound reduces player health', () => {
        const warrior = new Warrior(0, 'Warrior');
        const archer = new Archer(5, 'Archer');
        const game = new GameEngine([warrior, archer]);
        
        const initialHealth = archer.life;
        game.playRound([warrior, archer]);
        
        expect(archer.life).toBeLessThanOrEqual(initialHealth);
    });

    test('getStats returns correct statistics', () => {
        const warrior = new Warrior(0, 'Warrior');
        const archer = new Archer(5, 'Archer');
        const game = new GameEngine([warrior, archer]);
        
        const stats = game.getStats();
        
        expect(stats).toHaveProperty('totalRounds');
        expect(stats).toHaveProperty('ranking');
        expect(Array.isArray(stats.ranking)).toBe(true);
    });
});