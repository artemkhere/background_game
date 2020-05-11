import setupItemShop from './items/setupItemShop.js';

export default function setupGameSchema(gameSave) {
  const itemShop = setupItemShop(gameSave);

  return { itemShop };
}
