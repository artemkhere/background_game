import initiateCharacterBuild from '../character/initiateCharacterBuild.js';
import handleCharacterLevelUp from '../character/handleCharacterLevelUp.js';

export default function handleVictory(gameSessionState, socket) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  const enemyModel = gameState.arena.battle.enemyModel;
  const enemy = initiateCharacterBuild(enemyModel);

  const attributesSum = Object.values(enemy.attributes).reduce((acc, target) => { return acc + target; }, 0);

  const listOfPercentageStats = ['hitChance', 'critChance', 'critMultiplier', 'dodgeChance'];
  const statsSum = Object.keys(enemy.stats).reduce((acc, target) => {
    let value = enemy.stats[target];
    if (listOfPercentageStats.includes(target)) { Math.round(value * 100); }
    return acc + value;
  }, 0);

  gameState.arena.selectedHero.experience += attributesSum;
  gameState.arena.selectedHero.experience += statsSum;
  setGameState(gameState);

  handleCharacterLevelUp(gameSessionState, socket)
}
