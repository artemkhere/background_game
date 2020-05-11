export default {
  socket: {
    error: undefined,
    timeout: undefined,
    loading: undefined,
    connected: false
  },
  gameSchema: {
    itemShop: []
  },
  gameSession: {
    id: 0,
    resources: 0,
    totalCollectedResources: 0,
    gameState: {
      items: []
      // items: {
      //   equipedItems: {
      //     combo: false,
      //     sectionOne: undefined,
      //     sectionTwo: undefined,
      //     sectionThree: undefined
      //   },
      //   inventory: []
      // }
      // structures: [
      //   {
      //     unlocked: true,
      //     structureType: {},
      //   },
      // ],
    },
  },
  applicationState: {
    currentScreen: 'LandingPage',
    error: undefined,
    loading: false
  },
  user: {
    id: 0,
    email: '',
    loggedIn: false
  }
};
