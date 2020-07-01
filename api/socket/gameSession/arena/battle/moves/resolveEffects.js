import initiateCharacterBuild from '../../character/initiateCharacterBuild.js';

export default function resolveEffects(target, effects) {
  const targetReference = {...target};
  let effectsReference = [...effects];
  const logUpdate = [];

  // effect structure
  // {
  //   name: 'poison',
  //   turnsLeft: 3,
  //   stat: 'health',
  //   attribute: 'dexterity'
  //   amount: 3
  // }

  effectsReference.forEach(({ stat, attribute, amount }) => {
    if (stat) {
      targetReference.stats[stat] += amount;
      logUpdate.push(`${targetReference.name} ${stat} ${amount}`);
    }

    if (attribute) {
      targetReference.attributes[attribute] += amount;
      logUpdate.push(`${targetReference.name} ${attribute} ${amount}`);
    }
  });

  effectsReference = effectsReference.filter(({ turnsLeft }) => {
    return turnsLeft > 1;
  });

  return {
    target: initiateCharacterBuild(targetReference, targetReference.stats.health),
    effects: effectsReference,
    logUpdate
  }
}
