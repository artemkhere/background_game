import smack from './smack.js';

export default function resolveMove(
  source,
  target,
  sourceEffects,
  targetEffects,
  move
) {
  let sourceReference = {...source};
  let targetReference = {...target};
  let sourceEffectsReference = [...sourceEffects];
  let targetEffectsReference = [...targetEffects];
  let damage = 0;
  let logUpdate = [];

  // check if character knows that move!!!

  switch(move) {
    case 'smack':
      const smackResult = smack(source, target);
      logUpdate = smackResult.logUpdate;
      if (smackResult.damage > targetReference.stats.health) {
        targetReference.stats.health = 0;
      } else {
        targetReference.stats.health -= smackResult.damage;
      }
      break;
    default:
      console.log('Unknown move');
      return 'Unknown move';
  }

  return {
    source: sourceReference,
    target: targetReference,
    logUpdate,
    sourceEffects: sourceEffectsReference,
    targetEffects: targetEffectsReference
  }
}
