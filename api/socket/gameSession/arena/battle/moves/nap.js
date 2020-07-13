import statCalculators from '../../character/statCalculators.js';

const { calculateHealth } = statCalculators;

export default function nap(source) {
  const maxHealth = calculateHealth(source.attributes.stamina, source.equipped);
  let heal = Math.floor(maxHealth * 0.2);

  if ((source.stats.health + heal) > maxHealth) { heal = maxHealth - heal; }

  return {
    logUpdate: [`${source.name} took a nap and healed ${heal} health points.`],
    heal
  };
}
