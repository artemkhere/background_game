import initiateCharacterBuild from '../../character/initiateCharacterBuild.js';
import smack from './smack.js';
import nap from './nap.js';
import lick from './lick.js';

export default function resolveMove(
  source,
  target,
  move
) {
  if (!source.moves.includes(move)) {
    return {
      source,
      target,
      logUpdate: [`${source.name} doesn't know ${move}`],
    }
  }

  let sourceReference = {...source};
  let targetReference = {...target};
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
    case 'nap':
      const napResult = nap(source);
      logUpdate = napResult.logUpdate;
      sourceReference.stats.health += napResult.heal;
      break;
    case 'lick':
      const lickResult = lick(source, target);
      logUpdate = lickResult.logUpdate;
      targetReference = lickResult.target;
      break;
    default:
      return {
        source,
        target,
        logUpdate: [`${move} is not a move.`]
      };
  }

  return {
    source: initiateCharacterBuild(sourceReference, sourceReference.stats.health),
    target: initiateCharacterBuild(targetReference, targetReference.stats.health),
    logUpdate
  }
}
