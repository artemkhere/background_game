import statCalculators from '../../character/statCalculators.js';

const {
  calculateHitChance,
  calculateCritChance,
  calculateCritMultiplier,
  calculateDodgeChance,
  calculateDamage
} = statCalculators;

export default function smack(attacker, defender) {
  const attackHits = Math.random() <= calculateHitChance(
    attacker.attributes.dexterity,
    attacker.equipped,
    defender.attributes.agility
  );

  if (!attackHits) {
    return {
      logUpdate: [`${attacker.name} missed.`],
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
      logUpdate: [`${defender.name} dodged.`],
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
    logUpdate.push('CRITICAL!');
  }

  logUpdate.push(`${attacker.name} deals ${damage} damage.`);

  return {
    logUpdate,
    damage
  };
}
