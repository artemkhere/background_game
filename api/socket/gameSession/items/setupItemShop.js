import gameSchema from '../initialStates/gameSchema.js';
import determineAvailability from '../determineAvailability.js';

export default function setupItemShop(gameHistory) {
  const itemNames = Object.keys(gameSchema.items);

  const itemShop = itemNames.map((itemName) => {
    const item = gameSchema.items[itemName];
    return {
      name: item.name,
      effect: item.effect,
      clickEffectDescription: item.clickEffectDescription,
      harvestEffectDescription: item.harvestEffectDescription,
      description: item.description,
      price: item.price,
      shouldDisplay: determineAvailability(item.shouldDisplay, gameHistory),
      shouldDisplayRequirements: item.shouldDisplayRequirements,
      canBePurchased: determineAvailability(item.canBePurchased, gameHistory),
      canBePurchasedRequirements: item.canBePurchasedRequirements
    };
  });

  return itemShop;
}
