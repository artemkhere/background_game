import setupItemShop from './items/setupItemShop.js';
import setupStructureShop from './structures/setupStructureShop.js';

export default function setupGameSchema(gameHistory) {
  const itemShop = setupItemShop(gameHistory);
  const structureShop = setupStructureShop(gameHistory);

  return {
    itemShop,
    structureShop
  };
}
