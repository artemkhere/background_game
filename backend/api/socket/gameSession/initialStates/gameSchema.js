export default
// there should be no functions
// setup item shop should do all the calculations on what needs to be displayed
// and what is not
{
  itemEquipSlotPrices: [0, 10, 100, 1000, 10000],
  items: {
    kitty: {
      name: 'Kitty',
      effect: {
        structures: {
          names: ['Nasty Toilet'],
          impact: 'mul',
          amount: 2
        },
        allClicks: {
          impact: 'mul',
          amount: 2
        },
      },
      clickDescription: 'x2 from all clicks and for Nasty Toilets',
      // overTimeEffect: (overTimeValue, gameState) => { return overTimeValue; },
      // overTimeEffectDescription: 'x1',
      description: "It's a cat.",
      price: 10,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: {},
      canBePurchasedRequirements: 'Can always be purchased',
    },
    // birb: {
    //   name: 'Birb',
    //   description: "It's a birb.",
    //   clickEffect: (clickValue, gameState) => { return clickValue * 3; },
    //   clickEffectDescription: 'x3',
    //   price: 20,
    //   shouldDisplay: {},
    //   shouldDisplayRequirements: 'Will always display',
    //   canBePurchased: { purchased: ['Kitty'] },
    //   canBePurchasedRequirements: 'You need a Kitty to purchase a Birb.',
    // },
    // wabbit: {
    //   name: 'Wabbit',
    //   clickEffect: (clickValue, gameState) => { return clickValue * 4; },
    //   clickEffectDescription: 'x4',
    //   description: "It's a bunny.",
    //   price: 30,
    //   shouldDisplay: { purchased: ['Kitty'] },
    //   shouldDisplayRequirements: 'Will show when you get a Kitty.',
    //   canBePurchased: { purchased: ['Birb'] },
    //   canBePurchasedRequirements: 'You need a Birb to purchase a Wabbit.',
    // },
  },
  structures: {
    nastyToilet: {
      name: 'Nasty Toilet',
      clickEffect: (clickValue, gameState) => { return clickValue + 1; },
      clickEffectDescription: '+ 1',
      description: "It's so dirty we almost had to censor it.",
      price: 10,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: {},
      canBePurchasedRequirements: 'Can always be purchased',
    },
    toddlerBathroom: {
      name: 'Toddler Bathroom',
      description: "Small kids poop here.",
      clickEffect: (clickValue, gameState) => { return clickValue + 2; },
      clickEffectDescription: '+ 2',
      price: 20,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: { purchased: ['Nasty Toilet'] },
      canBePurchasedRequirements: 'You need a Nasty Toilet to purchase a Toddler Bathroom.',
    },
    badComedian: {
      name: 'Bad Comedian',
      clickEffect: (clickValue, gameState) => { return clickValue + 4; },
      clickEffectDescription: '+ 4',
      description: "He sucks.",
      price: 30,
      shouldDisplay: { purchased: ['Nasty Toilet'] },
      shouldDisplayRequirements: 'Will show when you get a Nasty Toilet.',
      canBePurchased: { purchased: ['Toddler Bathroom'] },
      canBePurchasedRequirements: 'You need a Toddler Bathroom to purchase a Bad Comedian.',
    },
  }
};
