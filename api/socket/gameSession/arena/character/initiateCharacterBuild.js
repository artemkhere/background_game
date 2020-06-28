import characterBaseStats from '../../initialStates/characterBaseStats';
import getModifierFromEquipment from './getModifierFromEquipment.js';
import statCalculators from './statCalculators.js';

const {
  calculateHitChance,
  calculateCritChance,
  calculateCritMultiplier,
  calculateDodgeChance,
  calculateDamage,
  calculateHealth
} = statCalculators;

const applyAttributeModifiersFromEquipment = (attributes, equipped) => {
  const dexterity = attributes.dexterity + getModifierFromEquipment('dexterity', equipped);
  const agility = attributes.agility + getModifierFromEquipment('agility', equipped);
  const stamina = attributes.stamina + getModifierFromEquipment('stamina', equipped);
  const strength = attributes.strength + getModifierFromEquipment('strength', equipped);

  return {
    dexterity,
    agility,
    stamina,
    strength
  }
}

const generateStats = (attributes, equipped) => {
  const hitChance = calculateHitChance(attributes.dexterity, equipped);
  const critChance = calculateCritChance(attributes.dexterity, equipped);
  const critMultiplier = calculateCritMultiplier(attributes.agility, equipped);
  const dodgeChance = calculateDodgeChance(attributes.agility, equipped);
  const damage = calculateDamage(attributes.strength, equipped);
  const health = calculateHealth(attributes.stamina, equipped);

  return {
    hitChance,
    critChance,
    critMultiplier,
    dodgeChance,
    damage,
    health
  }
}

export default function initiateCharacterBuild({ attributes, equipped }, health) {
  const listOfEquipment = Object.values(equipped).filter((piece) => {
    return piece != null;
  });

  const fullAttributes = applyAttributeModifiersFromEquipment(attributes, listOfEquipment);
  const stats = generateStats(fullAttributes, listOfEquipment);


  if (health && stats.health > health) { stats.health = health; }
  if (health === 0) { stats.health = 0; }

  return {
    attributes: fullAttributes,
    stats,
    equipped: listOfEquipment
  };
}
