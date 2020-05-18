export default {
  socket: {
    error: undefined,
    timeout: undefined,
    loading: undefined,
    connected: false
  },
  gameSession: {
    id: 0,
    resources: 0,
    gameState: {
      items: {
        equipedItems: {
          sectionOne: undefined,
          sectionTwo: undefined,
          sectionThree: undefined
        },
        inventory: []
      }
    },
    gameHistory: {
      resources: 0,
      clicks: 0,
      items: {
        purchased: []
      }
    },
    gameSchema: {
      itemShop: []
    }
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
