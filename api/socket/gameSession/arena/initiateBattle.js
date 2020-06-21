import characterBaseStats from '../initialStates/characterBaseStats';

const getModifierFromEquipment = (target, equipment) => {
  let modifier = 0;

  equipment.forEach((piece) => {
    if (piece.effects[target]) { modifier += piece.effects[target]; }
  });

  return modifier;
}

const applyAttributeModifiersFromEquipment = (attributes, equipped) => {
  const dexterity = attributes.dexterity + getModifierFromEquipment('dexterity', equipped);
  const agility = attributes.agility + getModifierFromEquipment('agility', equipped);
  const intellect = attributes.intellect + getModifierFromEquipment('intellect', equipped);
  const stamina = attributes.stamina + getModifierFromEquipment('stamina', equipped);
  const wizdom = attributes.wizdom + getModifierFromEquipment('wizdom', equipped);
  const strength = attributes.strength + getModifierFromEquipment('strength', equipped);

  return {
    dexterity,
    agility,
    intellect,
    stamina,
    wizdom,
    strength
  }
}

const initiateCharacter = ({ attributes, equipped }) => {
  const listOfEquipment = Object.values(equipped).filter((piece) => {
    return piece != null;
  });

  const fullAttributes = applyAttributeModifiersFromEquipment(attributes, listOfEquipment);
  const stats = generateStats(fullAttributes, listOfEquipment);

  return {
    attributes: fullAttributes,
    stats,
    equipped: listOfEquipment
  };
}

const calculateHitChance = (dexterity, equipped, enemyAgility = 0) => {
  let hitChance = characterBaseStats.hitChance;
  hitChance += Math.ceil((dexterity - enemyAgility) / 2) * 0.01;
  hitChance += getModifierFromEquipment('hitChance', equipped);
  return hitChance;
}

const calculateCritChance = (dexterity, equipped) => {
  let critChance = characterBaseStats.critChance;
  critChance += Math.ceil(dexterity / 2) * 0.01;
  critChance += getModifierFromEquipment('critChance', equipped);
  return critChance;
}

const calculateCritMultiplier = (agility, equipped) => {
  let critMultiplier = characterBaseStats.critMultiplier;
  critMultiplier += agility * 0.03;
  critMultiplier += getModifierFromEquipment('critMultiplier', equipped);
  return critMultiplier;
}

const calculateDodgeChance = (agility, equipped, enemyDexterity = 0) => {
  let dodgeChance = characterBaseStats.dodgeChance;
  dodgeChance += Math.ceil((agility - enemyDexterity) / 2) * 0.01;
  dodgeChance += getModifierFromEquipment('dodgeChance', equipped);
  return dodgeChance;
}

const calculateDamage = (strength, equipped, enemyArmour = 0) => {
  let damage = characterBaseStats.damage;
  damage += strength;
  damage += Math.floor(Math.random() * Math.ceil(strength / 3));
  damage += getModifierFromEquipment('damage', equipped);
  damage -= enemyArmour;
  return damage > 0 ? damage : 1;
}

const calculateMana = (wizdom, equipped) => {
  let mana = characterBaseStats.mana;
  mana += wizdom * 2;
  mana += getModifierFromEquipment('mana', equipped);
  return mana;
}

const calculateSpells = (wizdom, equipped) => {
  let spells = characterBaseStats.spells;
  spells += Math.floor(wizdom / 3);
  spells += getModifierFromEquipment('spells', equipped);
  return spells;
}

const calculateHealth = (stamina, equipped) => {
  let health = characterBaseStats.health;
  health += stamina * 2;
  health += getModifierFromEquipment('health', equipped);
  return health;
}

const generateStats = (attributes, equipped) => {
  const hitChance = calculateHitChance(attributes.dexterity, equipped);
  const critChance = calculateCritChance(attributes.dexterity, equipped);
  const critMultiplier = calculateCritMultiplier(attributes.agility, equipped);
  const dodgeChance = calculateDodgeChance(attributes.agility, equipped);
  const damage = calculateDamage(attributes.strength, equipped);
  const mana = calculateMana(attributes.wizdom, equipped);
  const spells = calculateSpells(attributes.wizdom, equipped);
  const health = calculateHealth(attributes.stamina, equipped);

  return {
    hitChance,
    critChance,
    critMultiplier,
    dodgeChance,
    damage,
    mana,
    spells,
    health
  }
}

export default function initiateBattle(heroModel, enemyModel) {
  let heroReference = initiateCharacter(heroModel);
  const getHero = () => { return heroReference; }
  const setHero = (newHero) => { heroReference = newHero; }

  let enemyReference = initiateCharacter(enemyModel);
  const getEnemy = () => { return enemyReference; }
  const setEnemy = (newEnemy) => { enemyReference = newEnemy; }

  let logReference = '';
  const getLog = () => { return logReference; }
  const setLog = (newLog) => { logReference = newLog; }

  // in the future!
  // handleTurnSart -- apply poison and debuffs
  // let turnState = {}

  return {
    getHero,
    setHero,
    getEnemy,
    setEnemy,
    getLog,
    setLog
  }
}

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
