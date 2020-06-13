import setupItemShop from './items/setupItemShop.js';
import setupStructureShop from './structures/setupStructureShop.js';
import setupConsumableShop from './consumables/setupConsumableShop.js';

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
