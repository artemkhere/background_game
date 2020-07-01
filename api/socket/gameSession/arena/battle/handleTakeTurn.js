import resolveMove from './moves/resolveMove.js';
import resolveEffects from './moves/resolveEffects.js';
import handleEndBattle from './handleEndBattle.js';
import initiateCharacterBuild from '../character/initiateCharacterBuild.js';

const heroGoesFirst = (hero, enemy) => {
  const heroAgility = hero.agility;
  const enemyAgility = enemy.agility;

  if (heroAgility > enemyAgility) {
    return true;
  } else if (heroAgility < enemyAgility) {
    return false;
  } else {
    return Math.random() >= 0.5;
  }
}

const checkIfBattleShouldEnd = (gameSessionState) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  const heroHealth = gameState.arena.battle.hero.stats.health;
  const enemyHealth = gameState.arena.battle.enemy.stats.health;

  if (heroHealth <= 0) {
    gameState.arena.battle.heroWon = false;
    gameState.arena.battle.battleShouldEnd = true;
  } else if (enemyHealth <= 0) {
    gameState.arena.battle.heroWon = true;
    gameState.arena.battle.battleShouldEnd = true;
  } else {
    gameState.arena.battle.battleShouldEnd = false;
  }

  setGameState(gameState);
}

const handleHeroMove = (gameSessionState, move) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  const battle = {...gameState.arena.battle};
  const {
    hero,
    enemy,
    log,
    heroEffects,
    enemyEffects
  } = battle;

  const heroActionResult = resolveMove(
    hero,
    enemy,
    heroEffects,
    enemyEffects,
    move
  );
  gameState.arena.battle.hero = heroActionResult.source;
  gameState.arena.battle.enemy = heroActionResult.target;
  gameState.arena.battle.log = [...log, ...heroActionResult.logUpdate];
  gameState.arena.battle.heroEffects = heroActionResult.sourceEffects;
  gameState.arena.battle.enemyEffects = heroActionResult.targetEffects;

  setGameState(gameState);
}

const handleEnemyMove = (gameSessionState, move) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  const battle = {...gameState.arena.battle};
  const {
    hero,
    enemy,
    log,
    heroEffects,
    enemyEffects
  } = battle;

  const heroActionResult = resolveMove(
    enemy,
    hero,
    enemyEffects,
    heroEffects,
    move
  );
  gameState.arena.battle.enemy = heroActionResult.source;
  gameState.arena.battle.hero = heroActionResult.target;
  gameState.arena.battle.log = [...log, ...heroActionResult.logUpdate];
  gameState.arena.battle.enemyEffects = heroActionResult.sourceEffects;
  gameState.arena.battle.heroEffects = heroActionResult.targetEffects;

  setGameState(gameState);
}

const handleHeroEffects = (gameSessionState) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  const battle = {...gameState.arena.battle};
  const {
    hero,
    heroEffects,
    log
  } = battle;

  const heroEffectsResult = resolveEffects(hero, heroEffects);
  gameState.arena.battle.hero = heroEffectsResult.target;
  gameState.arena.battle.heroEffects = heroEffectsResult.effects;
  gameState.arena.battle.log = [...log, ...heroEffectsResult.logUpdate];

  setGameState(gameState);
}

const handleEnemyEffects = (gameSessionState) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  const battle = {...gameState.arena.battle};
  const {
    enemy,
    enemyEffects,
    log
  } = battle;

  const enemyEffectsResult = resolveEffects(enemy, enemyEffects);
  gameState.arena.battle.enemy = enemyEffectsResult.target;
  gameState.arena.battle.enemyEffects = enemyEffectsResult.effects;
  gameState.arena.battle.log = [...log, ...enemyEffectsResult.logUpdate];

  setGameState(gameState);
}

export default function handleTakeTurn(
  gameSessionState,
  data,
  socket
) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();

  if (!gameState.inBattle) {
    socket.emit('operationFailed', { message: 'Not in battle.' });
    return;
  }

  gameState.arena.battle.turn += 1;
  gameState.arena.battle.log.push(`Turn ${gameState.arena.battle.turn} started.`);
  gameState.arena.battle.lastTurnTaken = Date.now();
  setGameState(gameState);

  const { hero, enemy } = gameState.arena.battle;

  if (heroGoesFirst(hero, enemy)) {
    handleHeroEffects(gameSessionState, data.move);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleHeroMove(gameSessionState, data.move);
    checkIfBattleShouldEnd(gameSessionState);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleEnemyEffects(gameSessionState, data.move);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleEnemyMove(gameSessionState, 'smack');
    checkIfBattleShouldEnd(gameSessionState);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }
  } else {
    handleEnemyEffects(gameSessionState, data.move);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleEnemyMove(gameSessionState, 'smack');
    checkIfBattleShouldEnd(gameSessionState);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleHeroEffects(gameSessionState, data.move);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }

    handleHeroMove(gameSessionState, data.move);
    checkIfBattleShouldEnd(gameSessionState);
    if (getGameState().arena.battle.battleShouldEnd) {
      handleEndBattle(gameSessionState, data, socket);
      return;
    }
  }

  console.log(gameState.arena.battle.log)
  console.log(`Hero: ${gameState.arena.battle.hero.stats.health}`)
  console.log(`Enemy: ${gameState.arena.battle.enemy.stats.health}`)
}
