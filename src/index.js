const Warrior = require('./players/Warrior');
const Archer = require('./players/Archer');
const Mage = require('./players/Mage');
const Dwarf = require('./players/Dwarf');
const Crossbowman = require('./players/Crossbowman');
const Demiurge = require('./players/Demiurge');
const GameEngine = require('./game/GameEngine');

/**
 * Главная функция запуска игры
 */
function main() {
    // Создаём персонажей
    const players = [
        new Warrior(0, 'Алёша Попович'),
        new Archer(5, 'Леголас'),
        new Mage(10, 'Гендальф'),
        new Dwarf(2, 'Гимли'),
        new Crossbowman(7, 'Ведьмак'),
        new Demiurge(3, 'Зевс')
    ];
    
    // Создаём игровой движок и запускаем игру
    const game = new GameEngine(players);
    const winner = game.start();
    
    // Выводим статистику
    console.log('\nИТОГОВАЯ СТАТИСТИКА:');
    const stats = game.getStats();
    console.table(stats.ranking);
    
    return winner;
}

if (require.main === module) {
    main();
}

module.exports = {
    Warrior,
    Archer,
    Mage,
    Dwarf,
    Crossbowman,
    Demiurge,
    GameEngine
};