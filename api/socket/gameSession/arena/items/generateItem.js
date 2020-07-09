function generateAgilityEffect(level) { return 0; }

function generateDexterityEffect(level) { return 0; }

function generateStaminaEffect(level) { return 0; }

function generateStrengthEffect(level) { return 0; }

function generateCritChanceEffect(level) { return 0; }

function generateCritMultiplierEffect(level) { return 0; }

function generatehitChanceEffect(level) { return 0; }

function generateDamageEffect(level) { return 0; }

function generateDodgeChanceEffect(level) { return 0; }

function generateRequirements(level) { return []; }

export default function generateItem(level, bodyPart) {
  let rarity = '';
  const rarityNumber = Math.ceil(Math.random() * 100);
  if (rarityNumber >= 99) {
    rarity = 'legendary';
  } else if (rarityNumber >= 90) {
    rarity = 'rare';
  } else if (rarityNumber >= 66) {
    rarity = 'uncommon';
  } else {
    rarity = 'common';
  }

  let impactPoints = 0;
  switch (rarity) {
    case 'legendary':
      // in the future will have a unique effect
      impactPoints = 6;
      break;
    case 'rare':
      impactPoints = 3 + Math.round(Math.random() * 2);
      break;
    case 'uncommon':
      impactPoints = 2 + Math.round(Math.random() * 2);
      break;
    case 'common':
      impactPoints = 1 + Math.round(Math.random());
      break;
    default:
      break;
  }

  const effects = {};
  const listOfTargets = ['agility', 'dexterity', 'stamina', 'strength', 'critChance', 'critMultiplier', 'hitChance' 'damage', 'dodgeChance'];
  for (let i = 0; i < impactPoints; i++) {
    const target = listOfTargets[Math.round(Math.random() * (listOfTargets.length - 1))]

    switch (target) {
      case 'agility':
        effects.agility = effects.agility || 0;
        effects.agility += generateAgilityEffect(level);
        break;
      case 'dexterity':
        effects.dexterity = effects.dexterity || 0;
        effects.dexterity += generateDexterityEffect(level);
        break;
      case 'stamina':
        effects.stamina = effects.stamina || 0;
        effects.stamina += generateStaminaEffect(level);
        break;
      case 'strength':
        effects.strength = effects.strength || 0;
        effects.strength += generateStrengthEffect(level);
        break;
      case 'critChance':
        effects.critChance = effects.critChance || 0;
        effects.critChance += generateCritChanceEffect(level);
        break;
      case 'critMultiplier':
        effects.critMultiplier = effects.critMultiplier || 0;
        effects.critMultiplier += generateCritMultiplierEffect(level);
        break;
      case 'hitChance':
        effects.hitChance = effects.hitChance || 0;
        effects.hitChance += generatehitChanceEffect(level);
        break;
      case 'damage':
        effects.damage = effects.damage || 0;
        effects.damage += generateDamageEffect(level);
        break;
      case 'dodgeChance':
        effects.dodgeChance = effects.dodgeChance || 0;
        effects.dodgeChance += generateDodgeChanceEffect(level);
        break;
      default:
        break;
    }
  }

  const requirements = generateRequirements(level);

  return {
    name: 'Random Item',
    rarity,
    level,
    effects,
    requirements
  }
}
