function generateRequirements(level) { return []; }

export default function generateItem(level, type) {
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
  const listOfTargets = ['agility', 'dexterity', 'stamina', 'strength', 'critChance', 'critMultiplier', 'hitChance', 'damage', 'health', 'dodgeChance'];
  for (let i = 0; i < impactPoints; i++) {
    const target = listOfTargets[Math.round(Math.random() * (listOfTargets.length - 1))];

    switch (target) {
      case 'agility':
        effects.agility = effects.agility || Math.round(level / 2);
        effects.agility += Math.round(Math.random() * Math.round(level / 2) * 0.5);
        break;
      case 'dexterity':
        effects.dexterity = effects.dexterity || Math.round(level / 2);
        effects.dexterity += Math.round(Math.random() * Math.round(level / 2) * 0.5);
        break;
      case 'stamina':
        effects.stamina = effects.stamina || Math.round(level / 2);
        effects.stamina += Math.round(Math.random() * Math.round(level / 2) * 0.5);
        break;
      case 'strength':
        effects.strength = effects.strength || Math.round(level / 2);
        effects.strength += Math.round(Math.random() * Math.round(level / 2) * 0.5);
        break;
      case 'critChance':
        effects.critChance = effects.critChance || Math.ceil(level / 4) * 0.01;
        effects.critChance += Math.round(Math.random() * Math.ceil(level / 4) * 0.5) * 0.01;
        break;
      case 'critMultiplier':
        effects.critMultiplier = effects.critMultiplier || Math.ceil(level / 2) * 0.01;
        effects.critMultiplier += Math.round(Math.random() * Math.ceil(level / 2) * 0.5) * 0.01;
        break;
      case 'hitChance':
        effects.hitChance = effects.hitChance || Math.ceil(level / 2) * 0.01;
        effects.hitChance += Math.round(Math.random() * Math.ceil(level / 2) * 0.5) * 0.01;
        break;
      case 'damage':
        effects.damage = effects.damage || Math.ceil(level / 4);
        effects.damage += Math.round(Math.random() * Math.ceil(level / 4) * 0.5);
        break;
      case 'dodgeChance':
        effects.dodgeChance = effects.dodgeChance || Math.ceil(level / 4) * 0.01;
        effects.dodgeChance += Math.round(Math.random() * Math.ceil(level / 4) * 0.5) * 0.01;
        break;
      case 'health':
        effects.health = effects.health || level;
        effects.health += Math.round(Math.random() * Math.round(level / 2) * 0.5);
        break;
      default:
        break;
    }
  }

  const requirements = generateRequirements(level);

  let itemType = type;
  if (!itemType) {
    const listOfTypes = ['weapon', 'ring', 'amulet', 'hat', 'shirt', 'pants'];
    itemType = listOfTypes[Math.round(Math.random() * (listOfTypes.length - 1))];
  }

  return {
    name: 'Random Item',
    type: itemType,
    rarity,
    level,
    effects,
    requirements
  }
}
