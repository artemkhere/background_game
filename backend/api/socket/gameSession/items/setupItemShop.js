import gameSchema from '../../../../gameSchema.js';

export default function setupItemShop(gameSave) {
  const itemNames = Object.keys(gameSchema.items);

  const itemShop = itemNames.map((itemName) => {
    const item = gameSchema.items[itemName];
    return {
      name: item.name,
      description: item.description,
      price: item.price,
      shouldDisplay: item.shouldDisplay(gameSave),
      shouldDisplayRequirements: item.shouldDisplayRequirements,
      canBePurchased: item.canBePurchased(gameSave),
      canBePurchasedRequirements: item.canBePurchasedRequirements
    };
  });

  return itemShop;
}
