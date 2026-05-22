/**
 * Игровой движок RPG
 */
class GameEngine {
    constructor(players) {
        this.players = players;
        this.round = 1;
    }

    /**
     * Запускает игру
     * @returns {Player} победитель
     */
    start() {
        let alivePlayers = this.players.filter(p => !p.isDead());
        
        this.printHeader();
        
        while (alivePlayers.length > 1) {
            this.playRound(alivePlayers);
            alivePlayers = this.players.filter(p => !p.isDead());
            this.printStatus(alivePlayers);
        }
        
        const winner = alivePlayers[0];
        this.printWinner(winner);
        return winner;
    }

    /**
     * Проводит один раунд игры
     * @param {Array<Player>} alivePlayers - живые игроки
     */
    playRound(alivePlayers) {
        console.log(`\n${'═'.repeat(50)}`);
        console.log(`📊 РАУНД ${this.round}`);
        console.log(`${'═'.repeat(50)}`);
        
        // Перемешиваем порядок ходов
        const shuffledPlayers = [...alivePlayers].sort(() => Math.random() - 0.5);
        
        for (const player of shuffledPlayers) {
            if (player.isDead()) continue;
            
            console.log(`\n🎭 Ход: ${player.name} [${player.description}]`);
            player.turn(this.players);
            
            // Проверяем, не закончилась ли игра
            if (this.players.filter(p => !p.isDead()).length === 1) break;
        }
        
        this.round++;
    }

    /**
     * Выводит заголовок игры
     */
    printHeader() {
        console.log('\n' + '█'.repeat(60));
        console.log('█' + ' '.repeat(58) + '█');
        console.log('█' + ' '.repeat(15) + '⚔️  RPG БИТВА  ⚔️' + ' '.repeat(15) + '█');
        console.log('█' + ' '.repeat(58) + '█');
        console.log('█'.repeat(60) + '\n');
        
        console.log('Участники битвы:');
        this.players.forEach(player => {
            console.log(`  • ${player.name} - ${player.description} (❤️ ${player.life})`);
        });
    }

    /**
     * Выводит текущий статус игры
     * @param {Array<Player>} alivePlayers - живые игроки
     */
    printStatus(alivePlayers) {
        console.log(`\n${'─'.repeat(50)}`);
        console.log(`📊 СТАТУС ПОСЛЕ РАУНДА ${this.round - 1}`);
        console.log(`${'─'.repeat(50)}`);
        
        alivePlayers.forEach(player => {
            const weaponStatus = player.weapon.isBroken() ? '🔨 Сломано' : '⚔️ ' + player.weapon.name;
            console.log(`  ${player.name} (${player.description}):`);
            console.log(`    ❤️  Жизнь: ${player.life}`);
            console.log(`    ✨ Мана: ${player.magic}`);
            console.log(`    ${weaponStatus}`);
            console.log(`    📍 Позиция: ${player.position}`);
        });
    }

    /**
     * Выводит победителя
     * @param {Player} winner - победитель
     */
    printWinner(winner) {
        console.log('\n' + '🏆'.repeat(30));
        console.log(`🏆  ПОБЕДИТЕЛЬ: ${winner.name} (${winner.description})!  🏆`);
        console.log(`🏆  ❤️  ${winner.life} ✨  ${winner.magic} 🗡️  ${winner.weapon.name}`);
        console.log('🏆'.repeat(30) + '\n');
    }

    /**
     * Получает статистику игры
     * @returns {Object} статистика
     */
    getStats() {
        const sortedPlayers = [...this.players].sort((a, b) => b.life - a.life);
        
        return {
            totalRounds: this.round - 1,
            winner: sortedPlayers[0].life > 0 ? sortedPlayers[0] : null,
            ranking: sortedPlayers.map((p, i) => ({
                place: i + 1,
                name: p.name,
                class: p.description,
                life: p.life,
                kills: p.kills || 0
            }))
        };
    }
}

module.exports = GameEngine;