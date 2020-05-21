export default {
  socket: {
    error: undefined,
    timeout: undefined,
    loading: undefined,
    connected: false
  },
  gameSession: {
    gameSaveID: 0,
    resources: 0,
    gameState: {
      items: {
        equipped: [],
        inventory: []
      },
      structures: {
        built: [],
        availableBuildSlots: 1
      }
    },
    gameHistory: {
      resources: 0,
      clicks: 0,
      items: {
        purchased: []
      },
      structures: {
        purchased: []
      }
    },
    gameSchema: {
      itemShop: [],
      structureShop: []
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
