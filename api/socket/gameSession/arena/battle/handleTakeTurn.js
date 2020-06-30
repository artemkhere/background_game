import resolveMove from './moves/resolveMove.js';
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

const handleHeroMove = (gameSessionState) => {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();

  const heroActionResult = resolveMove(
    hero,
    enemy,
    heroEffects,
    enemyEffects,
    data.move
  );
  hero = heroActionResult.source;
  enemy = heroActionResult.target;
  log = [...log, ...heroActionResult.logUpdate];
  heroEffects = heroActionResult.sourceEffects;
  enemyEffects = heroActionResult.targetEffects;

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

  const battle = {...gameState.arena.battle};
  let {
    created,
    hero,
    enemy,
    log,
    turn,
    heroEffects,
    enemyEffects,
    lastTurnTaken
  } = battle;

  turn += 1;
  log.push(`Turn ${turn} started.`);
  lastTurnTaken = Date.now();

  // need to initiate character every turn to reflect stats !!!

  // effects on stats are applied directly and are permanent for battle
  // determine who goes first!
  // apply effect before each character turn -- heals, poison,
  // progressive increase in stats - rage (lose health, gain strength)
  // everything else can be stored in stats

  // const heroEffectsResult = resolveEffects(hero, heroEffects);
  // hero = heroEffectsResult.target;
  // heroEffects = heroEffectsResult.effects;
  // log = [...log, ...heroEffectsResult.logUpdate];

  // const enemyEffectsResult = resolveEffects(enemy, enemyEffects);
  // enemy = enemyEffectsResult.target;
  // enemyEffects = enemyEffectsResult.effects;
  // log = [...log, ...enemyEffectsResult.logUpdate];
  // winner = battleShouldEnd(hero, enemy);
  // if (winner) {
  //   gameState.arena.battle.winner = winner;
  //   gameState.arena.battle.log = log;
  //   setGameState(gameState);
  //
  //   handleEndBattle(
  //     gameSessionState,
  //     data,
  //     socket
  //   );
  //   return;
  // }

  const heroActionResult = resolveMove(
    hero,
    enemy,
    heroEffects,
    enemyEffects,
    data.move
  );
  hero = heroActionResult.source;
  enemy = heroActionResult.target;
  log = [...log, ...heroActionResult.logUpdate];
  heroEffects = heroActionResult.sourceEffects;
  enemyEffects = heroActionResult.targetEffects;

  const enemyActionResult = resolveMove(
    enemy,
    hero,
    enemyEffects,
    heroEffects,
    data.move
  );
  enemy = enemyActionResult.source;
  hero = enemyActionResult.target;
  log = [...log, ...enemyActionResult.logUpdate];
  enemyEffects = enemyActionResult.sourceEffects;
  heroEffects = enemyActionResult.targetEffects;

  checkIfBattleShouldEnd(gameSessionState);
  if (getGameState().arena.battle.battleShouldEnd) {
    handleEndBattle(gameSessionState, data, socket);
    return;
  }

  gameState.arena.battle = {
    created,
    hero,
    enemy,
    log,
    turn,
    heroEffects,
    enemyEffects,
    lastTurnTaken
  };

  console.log(log)
  console.log(`Hero: ${hero.stats.health}`)
  console.log(`Enemy: ${enemy.stats.health}`)

  setGameState(gameState);
}
