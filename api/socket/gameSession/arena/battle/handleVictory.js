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

  const attributesSum = Object.values(enemy.attributes).reduce((a, b) => { return a + b; }, 0);
  const experienceEarned = Math.ceil(attributesSum / 10);

  gameState.arena.selectedHero.experience += experienceEarned;
  setGameState(gameState);

  handleCharacterLevelUp(gameSessionState, socket)
}
