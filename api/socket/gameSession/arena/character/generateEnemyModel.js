import gameSchema from '../../initialStates/gameSchema.js';

export default function generateEnemyModel(heroModel) {
  // generate attributes
  const totalHeroPoints = Object.values(heroModel.attributes).reduce((acc, amount) => {
    return acc + amount;
  }, 0);
  const divergancePoints = Math.ceil(totalHeroPoints * (Math.random() - Math.random()) * 0.45);
  let enemyPoints = totalHeroPoints + divergancePoints;

  const enemyAttributes = {};
  const attributesList = ['agility', 'dexterity', 'stamina', 'strength'];
  while (attributesList.length > 0) {
    const target = Math.round(Math.random() * (attributesList.length - 1));
    const points = Math.round(Math.random() * enemyPoints);
    enemyAttributes[attributesList[target]] = points;
    enemyPoints -= points;
    attributesList.splice(target, 1);
  }

  // generate moves
  movesList = [...gameSchema.movesList];
  const enemyMoves = ['smack'];
  const enemyLevel = heroModel.level;
  const movesToKnow = Math.floor(enemyLevel / 5);

  for (let i = 0; i < movesToKnow; i++) {
    const move = movesList[Math.round(Math.random() * (movesList.length - 1))];
    enemyMoves.push(move);
  }

  return {
    name: 'Random Enemy',
    level: enemyLevel,
    attributes: enemyAttributes,
    equipped: {},
    moves: enemyMoves,
    effects: []
  }

  // item generation
}
