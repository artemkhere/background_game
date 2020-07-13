import statCalculators from '../../character/statCalculators.js';

const { calculateHealth } = statCalculators;

export default function lick(attacker, defender) {
  const defenderReference = {...defender};

  const maxHealth = calculateHealth(defender.attributes.stamina, defender.equipped);
  const amount = -1 * Math.ceil(maxHealth * 0.05);

  defenderReference.effects.push({
    name: 'poison',
    turnsLeft: 3,
    stat: 'health',
    amount
  });

  return {
    logUpdate: [`${attacker.name} licked ${defender.name}. ${defender.name} feels gross.`],
    target: defenderReference
  };
}
