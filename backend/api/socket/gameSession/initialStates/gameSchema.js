export default
{
  items: {
    kitty: {
      name: 'Kitty',
      // pass in gameState to calculate what needs to be done
      // clickEffect: (resources, gameState) => { return resources * 2; },
      // clickEffectDescription: 'x2',
      // overTimeEffect: (resources) => { return resources; },
      // overTimeEffectDescription: 'x1',
      description: "It's a cat.",
      price: 10,
      shouldDisplay: () => { return true; },
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: () => { return true; },
      canBePurchasedRequirements: 'Can always be purchased',
    },
    birb: {
      name: 'Birb',
      description: "It's a birb.",
      price: 20,
      shouldDisplay: () => { return true; },
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: (gameHistory) => {
        return !!gameHistory.items.purchased.find(({ name }) => {
          return name === 'Kitty';
        });
      },
      canBePurchasedRequirements: 'You need a Kitty to purchase a Birb.',
    },
    wabbit: {
      name: 'Wabbit',
      description: "It's a bunny.",
      price: 30,
      shouldDisplay: (gameHistory) => {
        // ARTEM WARNING should look for both equiped and for inventory
        return !!gameHistory.items.purchased.find(({ name }) => {
          return name === 'Kitty';
        });
      },
      shouldDisplayRequirements: 'Will show when you get a Kitty.',
      canBePurchased: (gameHistory) => {
        // ARTEM WARNING should look for both equiped and for inventory
        return !!gameHistory.items.purchased.find(({ name }) => {
          return name === 'Birb';
        });
      },
      canBePurchasedRequirements: 'You need a Birb to purchase a Wabbit.',
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
