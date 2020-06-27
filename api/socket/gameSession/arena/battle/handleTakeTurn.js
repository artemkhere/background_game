import statCalculators from '../character/statCalculators.js';

const {
  calculateHitChance,
  calculateCritChance,
  calculateCritMultiplier,
  calculateDodgeChance,
  calculateDamage
} = statCalculators;

const getAttackResult = (attacker, defender) => {
  const attackHits = Math.random() <= calculateHitChance(
    attacker.attributes.dexterity,
    attacker.equipped,
    defender.attributes.agility
  );

  if (!attackHits) {
    return {
      logUpdate: ["Attacker missed."],
      damage: 0
    };
  }

  const enemyDodges = Math.random() <= calculateDodgeChance(
    defender.attributes.agility,
    defender.equipped,
    attacker.attributes.dexterity
  );

  if (enemyDodges) {
    return {
      logUpdate: ["Defender dodged."],
      damage: 0
    };
  }

  const criticalHit = Math.random() <= calculateCritChance(
    attacker.attributes.dexterity,
    attacker.equipped
  );

  let damage = calculateDamage(
    attacker.attributes.strength,
    attacker.equipped
  );

  const logUpdate = [];

  if (criticalHit) {
    damage = damage * calculateCritMultiplier(attacker.attributes.agility, attacker.equipped);
    damage = Math.ceil(damage);
    logUpdate.push("CRITICAL!");
  }

  logUpdate.push(`Attacker deals ${damage} damage.`);

  return {
    logUpdate,
    damage
  };
}

const resolveAction = (
  source,
  target,
  sourceEffects,
  targetEffects,
  action,
  specialMove
) => {
  switch(action) {
    case 'attack':
      const { logUpdate, damage } = getAttackResult(source, target);
      target.stats.health -= damage;

      return {
        source,
        target,
        logUpdate,
        sourceEffects,
        targetEffects
      }
      break;
    default:
      console.log('Unknown move');
      return 'Unknown move';
  }
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

  const {
    heroAction,
    specialMove
  } = data;

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

  // I need to somehow store hero health and mana after battle is over!

  // const heroEffectsResult = resolveEffects(hero, heroEffects);
  // hero = heroEffectsResult.target;
  // heroEffects = heroEffectsResult.effects;
  // log = [...log, ...heroEffectsResult.logUpdate];
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

  const heroActionResult = resolveAction(
    hero,
    enemy,
    heroEffects,
    enemyEffects,
    data.action,
    data.specialMove
  );
  hero = heroActionResult.source;
  enemy = heroActionResult.target;
  log = [...log, ...heroActionResult.logUpdate];
  heroEffects = heroActionResult.sourceEffects;
  enemyEffects = heroActionResult.targetEffects;
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

  console.log("log")
  console.log(log)
  console.log(enemy.stats.health)

  setGameState(gameState);
}
