import setupItemShop from './items/setupItemShop.js';

export default function setupGameSchema(gameHistory) {
  const itemShop = setupItemShop(gameHistory);

  return { itemShop };
}
