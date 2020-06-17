export default
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
        clicks: {
          impact: 'mul',
          amount: 1
        },
        harvest: {
          impact: 'mul',
          amount: 1
        }
      },
      clickDescription: 'x2 from all clicks and for Nasty Toilets',
      harvestEffectDescription: 'x1',
      description: "It's a cat.",
      price: 10,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: {},
      canBePurchasedRequirements: 'Can always be purchased',
    },
    birb: {
      name: 'Birb',
      description: "It's a birb.",
      effect: {
        structures: {
          names: [],
          impact: 'mul',
          amount: 1
        },
        clicks: {
          impact: 'mul',
          amount: 3
        },
        harvest: {
          impact: 'mul',
          amount: 1
        }
      },
      clickEffectDescription: 'x3',
      harvestEffectDescription: 'x1',
      price: 20,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: { purchased: ['Kitty'] },
      canBePurchasedRequirements: 'You need a Kitty to purchase a Birb.',
    },
    wabbit: {
      name: 'Wabbit',
      effect: {
        structures: {
          names: [],
          impact: 'mul',
          amount: 1
        },
        clicks: {
          impact: 'mul',
          amount: 4
        },
        harvest: {
          impact: 'mul',
          amount: 1
        }
      },
      clickEffectDescription: 'x4',
      harvestEffectDescription: 'x1',
      description: "It's a bunny.",
      price: 30,
      shouldDisplay: { purchased: ['Kitty'] },
      shouldDisplayRequirements: 'Will show when you get a Kitty.',
      canBePurchased: { purchased: ['Birb'] },
      canBePurchasedRequirements: 'You need a Birb to purchase a Wabbit.',
    },
  },
  structureBuildSlotPrices: [0, 10, 100, 1000, 10000],
  structures: {
    nastyToilet: {
      name: 'Nasty Toilet',
      effect: {
        clicks: {
          impact: 'plus',
          amount: 1
        },
        harvest: {
          impact: 'plus',
          amount: 1
        }
      },
      clickEffectDescription: '+ 1',
      harvestEffectDescription: '+ 1',
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
      effect: {
        clicks: {
          impact: 'plus',
          amount: 2
        },
        harvest: {
          impact: 'plus',
          amount: 2
        }
      },
      clickEffectDescription: '+ 2',
      harvestEffectDescription: '+ 2',
      price: 20,
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      canBePurchased: { purchased: ['Nasty Toilet'] },
      canBePurchasedRequirements: 'You need a Nasty Toilet to purchase a Toddler Bathroom.',
    },
    badComedian: {
      name: 'Bad Comedian',
      effect: {
        clicks: {
          impact: 'plus',
          amount: 3
        },
        harvest: {
          impact: 'plus',
          amount: 3
        }
      },
      clickEffectDescription: '+ 3',
      harvestEffectDescription: '+ 3',
      description: "He sucks.",
      price: 30,
      shouldDisplay: { purchased: ['Nasty Toilet'] },
      shouldDisplayRequirements: 'Will show when you get a Nasty Toilet.',
      canBePurchased: { purchased: ['Toddler Bathroom'] },
      canBePurchasedRequirements: 'You need a Toddler Bathroom to purchase a Bad Comedian.',
    },
  },
  consumables: {
    tuna: {
      name: 'Tuna',
      effect: {
        amount: 20,
        cycles: 2
      },
      effectDescription: 'Will produce 20 resources every 10 seconds. Lasts 20 seconds.',
      description: "It's a can of tuna.",
      shouldDisplay: {},
      shouldDisplayRequirements: 'Will always display',
      lastCycle: undefined,
      purchased: undefined
    }
  }
};
