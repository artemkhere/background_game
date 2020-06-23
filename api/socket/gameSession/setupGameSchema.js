import setupItemShop from './harvest/items/setupItemShop.js';
import setupStructureShop from './harvest/structures/setupStructureShop.js';
import setupConsumableShop from './harvest/consumables/setupConsumableShop.js';

export default function setupGameSchema(gameHistory, gameState) {
  const itemShop = setupItemShop(gameHistory);
  const structureShop = setupStructureShop(gameHistory);
  const consumableShop = setupConsumableShop(gameHistory, gameState);

  return {
    itemShop,
    structureShop,
    consumableShop
  };
}
