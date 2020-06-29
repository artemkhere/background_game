import smack from './smack.js';

export default function resolveMove(
  source,
  target,
  sourceEffects,
  targetEffects,
  move
) {
  if (!source.moves.includes(move)) {
    return {
      source,
      target,
      logUpdate: [`${source.name} doesn't know ${move}`],
      sourceEffects,
      targetEffects
    }
  }

  let sourceReference = {...source};
  let targetReference = {...target};
  let sourceEffectsReference = [...sourceEffects];
  let targetEffectsReference = [...targetEffects];
  let damage = 0;
  let logUpdate = [];

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
      return {
        source,
        target,
        logUpdate: [`${move} is not a move.`],
        sourceEffects,
        targetEffects
      };
  }

  return {
    source: sourceReference,
    target: targetReference,
    logUpdate,
    sourceEffects: sourceEffectsReference,
    targetEffects: targetEffectsReference
  }
}
