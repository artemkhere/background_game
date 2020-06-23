import gameSchema from '../../initialStates/gameSchema.js';
import determineAvailability from '../determineAvailability.js';

const calculatePrice = (consumable, gameState) => {
  let numberOfSameOnesInUse = 0;
  gameState.consumables.forEach(({ name }) => {
    if (consumable.name === name) { numberOfSameOnesInUse += 1; }
  });

  const { amount, cycles } = consumable.effect;
  const initialPrice = Math.ceil(amount * cycles / 2);
  const priceIncrease = Math.ceil(initialPrice * 0.2 * numberOfSameOnesInUse);
  return initialPrice + priceIncrease;
}

export default function setupConsumableShop(gameHistory, gameState) {
  const consumableNames = Object.keys(gameSchema.consumables);

  const consumableShop = consumableNames.map((consumableName) => {
    const consumable = gameSchema.consumables[consumableName];
    return {
      name: consumable.name,
      effect: consumable.effect,
      effectDescription: consumable.effectDescription,
      description: consumable.description,
      price: calculatePrice(consumable, gameState),
      shouldDisplay: determineAvailability(consumable.shouldDisplay, gameHistory),
      shouldDisplayRequirements: consumable.shouldDisplayRequirements,
      lastCycle: Date.now()
    };
  });

  return consumableShop;
}
