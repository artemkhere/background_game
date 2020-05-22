import gameSchema from '../initialStates/gameSchema.js';

function determineAvailabilityForItem(requirements, gameHistory) {
  if (Object.keys(requirements).length === 0) { return true; }

  let available = false;

  if (requirements.purchased) {
    requirements.purchased.forEach((requirement) => {
      available = !!gameHistory.purchased.find(({ name }) => {
        return name === requirement;
      });
    });
  }

  return available;
}

export default function setupItemShop(gameHistory) {
  const itemNames = Object.keys(gameSchema.items);

  const itemShop = itemNames.map((itemName) => {
    const item = gameSchema.items[itemName];
    return {
      name: item.name,
      clickEffect: item.clickEffect,
      clickEffectDescription: item.clickEffectDescription,
      description: item.description,
      price: item.price,
      shouldDisplay: determineAvailabilityForItem(item.shouldDisplay, gameHistory),
      shouldDisplayRequirements: item.shouldDisplayRequirements,
      canBePurchased: determineAvailabilityForItem(item.canBePurchased, gameHistory),
      canBePurchasedRequirements: item.canBePurchasedRequirements
    };
  });

  return itemShop;
}
