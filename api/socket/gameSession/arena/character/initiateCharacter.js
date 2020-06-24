import characterBaseStats from '../../initialStates/characterBaseStats';
import getModifierFromEquipment from './getModifierFromEquipment.js';
import statCalculators from './statCalculators.js';

const {
  calculateHitChance,
  calculateCritChance,
  calculateCritMultiplier,
  calculateDodgeChance,
  calculateDamage,
  calculateMana,
  calculateSpells,
  calculateHealth
} = statCalculators;

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

export default function initiateCharacter({ attributes, equipped }) {
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
