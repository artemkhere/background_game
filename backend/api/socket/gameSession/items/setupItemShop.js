import gameSchema from '../initialStates/gameSchema.js';

export default function setupItemShop(gameHistory) {
  const itemNames = Object.keys(gameSchema.items);

  const itemShop = itemNames.map((itemName) => {
    const item = gameSchema.items[itemName];
    return {
      name: item.name,
      description: item.description,
      price: item.price,
      shouldDisplay: item.shouldDisplay(gameHistory),
      shouldDisplayRequirements: item.shouldDisplayRequirements,
      canBePurchased: item.canBePurchased(gameHistory),
      canBePurchasedRequirements: item.canBePurchasedRequirements
    };
  });

  return itemShop;
}
