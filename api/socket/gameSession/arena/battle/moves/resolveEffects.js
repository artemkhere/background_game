import initiateCharacterBuild from '../../character/initiateCharacterBuild.js';

export default function resolveEffects(target) {
  const targetReference = {...target};
  let effectsReference = [...target.effects];
  const logUpdate = [];

  // effect structure
  // {
  //   name: 'poison',
  //   turnsLeft: 3,
  //   stat: 'health',
  //   attribute: 'dexterity',
  //   amount: 3
  // }

  effectsReference.forEach((effect) => {
    let {
      stat,
      attribute,
      amount
    } = effect;

    if (stat) {
      if (stat === 'health' && (target.stats.health - amount) < 0) {
        amount = target.stats.health;
      }

      targetReference.stats[stat] += amount;

      logUpdate.push(`${targetReference.name} ${stat} ${amount}`);
    }

    if (attribute) {
      targetReference.attributes[attribute] += amount;
      logUpdate.push(`${targetReference.name} ${attribute} ${amount}`);
    }

    effect.turnsLeft -= 1;
  });

  effectsReference = effectsReference.filter(({ turnsLeft }) => {
    return turnsLeft > 0;
  });

  targetReference.effects = effectsReference;

  return {
    target: initiateCharacterBuild(targetReference, targetReference.stats.health),
    logUpdate
  }
}
