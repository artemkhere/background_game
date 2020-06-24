import initiateCharacter from '../character/initiateCharacter.js';

export default function initiateBattle(gameSessionState, data, socket) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();

  // const hero = gameState.arena.selectedHero; // proper place to grab the hero model
  const hero = {
    name: 'Jabronie',
    attributes: {
      dexterity: 3, // hit chance, crit chance
      agility: 3, // dodge chance, crit dmg multiplier
      intellect: 3, // spell requirements, spell effect
      stamina: 5, // amount of health
      wizdom: 3, // amount of mana, amount of spells
      strength: 2 // dmg done
    },
    equipped: {
      weapon: undefined,
      ring: undefined,
      amulet: undefined,
      head: undefined,
      body: undefined,
      legs: {
        name: 'Poopy booties',
        rarity: 'common',
        effects: {
          dexterity: 1,
          damage: 1,
          hitChance: 0.05
        }
      },
      feet: undefined,
    }
  }

  if (!hero) {
    socket.emit('operationFailed', { message: "No hero selected." });
    return;
  }

  gameState.inBattle = true;
  const initialLogRecord = `Battle started between ${hero.name} and ${hero.name}.`
  gameState.arena.battle = {
    created: Date.now(),
    hero: initiateCharacter(hero),
    enemy: initiateCharacter(hero), // randomly generated in the future or pulled from db
    log: [initialLogRecord],
    turn: 1,
    heroEffects: [], // [{ name: 'poison', targetStat: 'health', effect: '-2' }]
    enemEffects: []
  }

  // what to do -- similar to items, refactor to handle battle actions
  // on term end determine if battle is over
  // handleTurnSart -- apply poison and debuffs

  setGameState(gameState);
}

// initiateArena -- inBattle ? - return battle state : show other stuff

// const getAttackResult = (attacker, defender) => {
//   console.log(Math.random())
//   const attackHits = Math.random() <= calculateHitChance(
//     attacker.attributes.dexterity,
//     attacker.equipped,
//     defender.attributes.agility
//   );
//
//   if (!attackHits) {
//     return {
//       logUpdate: log + "Attacker missed. ",
//       damage: 0
//     };
//   }
//
//   const enemyDodges = Math.random() <= calculateDodgeChance(
//     defender.attributes.agility,
//     defender.equipped,
//     attacker.attributes.dexterity
//   );
//
//   if (enemyDodges) {
//     return {
//       logUpdate: log + "Defender dodges. ",
//       damage: 0
//     };
//   }
//
//   const criticalHit = Math.random() <= calculateCritChance(
//     attacker.attributes.dexterity,
//     attacker.equipped
//   );
//
//   let damage = calculateDamage(
//     attacker.attributes.strength,
//     attacker.equipped
//   );
//   let logUpdate = '';
//
//   if (criticalHit) {
//     damage = damage * calculateCritMultiplier(attacker.attributes.agility, attacker.equipped);
//     logUpdate = logUpdate + "CRITICAL! ";
//   }
//
//   return {
//     logUpdate: logUpdate + `Attacker deals ${damage} damage. `,
//     damage
//   };
// }
//
// const handleHeroAction = (source, target, action, specialMove) => {
//   switch(action) {
//     case 'attack':
//       const { logUpdate, damage } = getAttackResult(source, target);
//       const udpatedEnemy = {...enemy};
//       udpatedEnemy.stats.health -= damage;
//       setEnemy(udpatedEnemy);
//       console.log("HERO: " + logUpdate)
//       setLog(log + logUpdate);
//       break;
//     default:
//       console.log("Unknown move");
//       return "Unknown move";
//   }
// }
//
// const handleEnemyAction = (source, target, action, specialMove) => {
//   switch(action) {
//     case 'attack':
//       const { logUpdate, damage } = getAttackResult(source, target);
//       const udpatedHero = {...hero};
//       udpatedHero.stats.health -= damage;
//       setHero(udpatedHero);
//       console.log("ENEMY: " + logUpdate)
//       setLog(log + logUpdate);
//       break;
//     default:
//       console.log("Unknown move");
//       return "Unknown move";
//   }
// }
//
// const handleTurn = (heroAction) => {
//   return () => {
//     setLog("Next turn");
//
//     handleHeroAction(hero, enemy, heroAction);
//     handleEnemyAction(enemy, hero, 'attack');
//
//     if (hero.stats.health <= 0) {
//       hero.stats.health = 0;
//       setLog('Hero lost!')
//     }
//
//     if (enemy.stats.health <= 0) {
//       hero.stats.health = 0;
//       setLog('Hero won!')
//     }
//   }
// }
