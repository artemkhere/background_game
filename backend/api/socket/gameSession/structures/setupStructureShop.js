import gameSchema from '../initialStates/gameSchema.js';
import determineAvailability from '../determineAvailability.js';

export default function setupStructureShop(gameHistory) {
  const structureNames = Object.keys(gameSchema.structures);

  const structureShop = structureNames.map((structureName) => {
    const structure = gameSchema.structures[structureName];
    return {
      name: structure.name,
      clickEffect: structure.clickEffect,
      clickEffectDescription: structure.clickEffectDescription,
      description: structure.description,
      price: structure.price,
      shouldDisplay: determineAvailability(structure.shouldDisplay, gameHistory),
      shouldDisplayRequirements: structure.shouldDisplayRequirements,
      canBePurchased: determineAvailability(structure.canBePurchased, gameHistory),
      canBePurchasedRequirements: structure.canBePurchasedRequirements
    };
  });

  return structureShop;
}
