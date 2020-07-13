import initiateCharacterBuild from '../character/initiateCharacterBuild.js';
import generateEnemyModel from '../character/generateEnemyModel.js';
import gameSchema from '../../initialStates/gameSchema.js';

export default function initiateBattle(
  gameSessionState,
  data,
  socket
) {
  const {
    getGameState,
    setGameState,
    getResources,
    setResources
  } = gameSessionState;

  const gameState = getGameState();
  const heroModel = gameState.arena.selectedHero;
  const enemyModel = generateEnemyModel(heroModel);

  if (!heroModel) {
    socket.emit('operationFailed', { message: 'No hero selected.' });
    return;
  }

  if (heroModel.health <= 0) {
    socket.emit('operationFailed', { message: 'Heal your hero first.' });
    return;
  }

  const { battlePrices } = gameSchema;
  let costToInitiateBattle = battlePrices[heroModel.level];
  if (!costToInitiateBattle) {
    costToInitiateBattle = battlePrices[battlePrices.length - 1];
  }

  let resources = getResources();
  if (costToInitiateBattle > resources) {
    socket.emit('operationFailed', { message: 'No enought resources.' });
    return;
  } else {
    setResources(resources - costToInitiateBattle);
  }

  gameState.inBattle = true;
  gameState.arena.battle = {
    created: Date.now(),
    enemyModel,
    hero: initiateCharacterBuild(heroModel, heroModel.health),
    enemy: initiateCharacterBuild(enemyModel),
    log: [`Battle started between ${heroModel.name} and ${enemyModel.name}.`],
    turn: 0,
    lastTurnTaken: undefined,
    winner: undefined,
    heroWon: undefined,
    battleShouldEnd: false
  }

  setGameState(gameState);
}
