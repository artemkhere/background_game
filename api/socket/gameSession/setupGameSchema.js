import setupItemShop from './harvest/items/setupItemShop';
import setupStructureShop from './harvest/structures/setupStructureShop';
import setupConsumableShop from './harvest/consumables/setupConsumableShop';
import gameSchema from './initialStates/gameSchema';

export default function setupGameSchema(gameHistory, gameState) {
  const itemShop = setupItemShop(gameHistory);
  const structureShop = setupStructureShop(gameHistory);
  const consumableShop = setupConsumableShop(gameHistory, gameState);

  return {
    itemShop,
    structureShop,
    consumableShop,
    harvestLevelRequirements:  gameSchema.harvestLevelRequirements,
  };
}
