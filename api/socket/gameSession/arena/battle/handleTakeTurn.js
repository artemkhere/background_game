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
  action
) => {
  let sourceReference = {...source};
  let targetReference = {...target};
  let sourceEffectsReference = [...sourceEffects];
  let targetEffectsReference = [...targetEffects];
  let damage = 0;
  let logUpdate = [];

  switch(action) {
    case 'attack':
      const attackResult = getAttackResult(source, target);
      logUpdate = attackResult.logUpdate;
      if (attackResult.damage > targetReference.stats.health) {
        targetReference.stats.health = 0;
      } else {
        targetReference.stats.health -= attackResult.damage;
      }
      break;
    default:
      console.log('Unknown move');
      return 'Unknown move';
  }
  return {
    source: sourceReference,
    target: targetReference,
    logUpdate,
    sourceEffects: sourceEffectsReference,
    targetEffects: targetEffectsReference
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

  // effects on stats are applied directly and are permanent for battle
  // determine who goes first!
  // apply effect before each turn -- heals, poison,
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

  const heroActionResult = resolveAction(
    hero,
    enemy,
    heroEffects,
    enemyEffects,
    data.action
  );
  hero = heroActionResult.source;
  enemy = heroActionResult.target;
  log = [...log, ...heroActionResult.logUpdate];
  heroEffects = heroActionResult.sourceEffects;
  enemyEffects = heroActionResult.targetEffects;

  const enemyActionResult = resolveAction(
    enemy,
    hero,
    enemyEffects,
    heroEffects,
    data.action,
    data.specialMove
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
