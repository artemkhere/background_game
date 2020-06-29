import resolveMove from './moves/resolveMove.js';

const heroGoesFirst = (hero, enemy) => {
  
}

const battleShouldEnd = (hero, enemy) => {
  const heroHealth = hero.attributes.health;
  const enemyHealth = enemy.attributes.health;

  if (heroHealth === 0) { return enemy; }
  if (enemyHealth === 0) { return hero; }
  return undefined;
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
  const battle = {...gameState.arena.battle};
  let {
    created,
    hero,
    enemy,
    log,
    turn,
    heroEffects,
    enemyEffects,
    lastTurnTaken,
    winner
  } = battle;

  turn += 1;
  log.push(`Turn ${turn} started.`);
  lastTurnTaken = Date.now();

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
