import gameSchema from '../initialStates/gameSchema.js';

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
      shouldDisplay: structure.shouldDisplay(gameHistory),
      shouldDisplayRequirements: structure.shouldDisplayRequirements,
      canBePurchased: structure.canBePurchased(gameHistory),
      canBePurchasedRequirements: structure.canBePurchasedRequirements
    };
  });

  return structureShop;
}
