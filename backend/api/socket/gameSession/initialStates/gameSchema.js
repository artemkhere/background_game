export default
{
  items: {
    kitty: {
      name: 'Kitty',
      clickEffect: (clickValue, gameState) => { return clickValue * 2; },
      clickEffectDescription: 'x2',
      // overTimeEffect: (overTimeValue, gameState) => { return overTimeValue; },
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
      clickEffect: (clickValue, gameState) => { return clickValue * 3; },
      clickEffectDescription: 'x3',
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
      clickEffect: (clickValue, gameState) => { return clickValue * 4; },
      clickEffectDescription: 'x4',
      description: "It's a bunny.",
      price: 30,
      shouldDisplay: (gameHistory) => {
        return !!gameHistory.items.purchased.find(({ name }) => {
          return name === 'Kitty';
        });
      },
      shouldDisplayRequirements: 'Will show when you get a Kitty.',
      canBePurchased: (gameHistory) => {
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
  structures: {
    nastyToilet: {
      name: 'Nasty Toilet',
      clickEffect: (clickValue, gameState) => { return clickValue + 1; },
      clickEffectDescription: '+ 1',
      description: "It's so dirty we almost had to censor it.",
      price: 10,
      shouldDisplay: () => { return true; },
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: () => { return true; },
      canBePurchasedRequirements: 'Can always be purchased',
    },
    toddlerBathroom: {
      name: 'Toddler Bathroom',
      description: "Small kids poop here.",
      clickEffect: (clickValue, gameState) => { return clickValue + 2; },
      clickEffectDescription: '+ 2',
      price: 20,
      shouldDisplay: () => { return true; },
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: (gameHistory) => {
        return !!gameHistory.structures.purchased.find(({ name }) => {
          return name === 'Nasty Toilet';
        });
      },
      canBePurchasedRequirements: 'You need a Nasty Toilet to purchase a Toddler Bathroom.',
    },
    badComedian: {
      name: 'Bad Comedian',
      clickEffect: (clickValue, gameState) => { return clickValue + 4; },
      clickEffectDescription: '+ 4',
      description: "He sucks.",
      price: 30,
      shouldDisplay: (gameHistory) => {
        return !!gameHistory.structures.purchased.find(({ name }) => {
          return name === 'Nasty Toilet';
        });
      },
      shouldDisplayRequirements: 'Will show when you get a Nasty Toilet.',
      canBePurchased: (gameHistory) => {
        return !!gameHistory.structures.purchased.find(({ name }) => {
          return name === 'Toddler Bathroom';
        });
      },
      canBePurchasedRequirements: 'You need a Toddler Bathroom to purchase a Bad Comedian.',
    },
  }
};
