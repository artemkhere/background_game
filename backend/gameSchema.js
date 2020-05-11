export default
{
  // items are only multipliers not adders
  items: {
    kitty: {
      name: 'Kitty',
      // pass in gameState to calculate what needs to be done
      // clickEffect: (resources, gameState) => { return resources * 2; },
      // clickEffectDescription: 'x2',
      // overTimeEffect: (resources) => { return resources; },
      // overTimeEffectDescription: 'x1',
      description: 'lol',
      price: 100,
      shouldDisplay: () => { return true; },
      canBePurchased: () => { return true; }
    },
    // itemWithStructureImpact: {
    //   name: 'itemWithStructureImpact',
    //   clickEffect: (resources) => { return buildingTypeClick * 2; },
    //   clickEffectDescription: 'x2',
    //   overTimeEffect: (resources) => { return resources; },
    //   overTimeEffectDescription: 'x1',
    //   description: 'lol',
    //   price: 100,
    //   requirementsToDisplay: () => { return true; },
    //   requirementTsoPurchase: () => { return true; }
    // }
  },
  itemCombos: {
    kittykittykitty: {
      name: 'Triple Kitty',
      clickEffect: (resources) => { return resources + 12; },
      clickEffectDescription: '+12',
      overTimeEffect: (resources) => { return resources; },
      overTimeEffectDescription: 'x1',
    }
  },
};
