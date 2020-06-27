import getModifierFromEquipment from './getModifierFromEquipment.js';
import characterBaseStats from '../../initialStates/characterBaseStats';

const calculateHitChance = (dexterity, equipped, enemyAgility = 0) => {
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

export default {
  calculateHitChance,
  calculateCritChance,
  calculateCritMultiplier,
  calculateDodgeChance,
  calculateDamage,
  calculateMana,
  calculateSpells,
  calculateHealth
}
