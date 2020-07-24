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
      harvest: {
        items: {
          equipped: [],
          inventory: []
        },
        structures: {
          built: [],
          availableBuildSlots: 1
        },
        consumables: []
      }
    },
    gameHistory: {
      resources: 0,
      harvest: {
        clicks: 0,
        items: {
          purchased: []
        },
        structures: {
          purchased: []
        }
      }
    },
    gameSchema: {
      itemShop: [],
      structureShop: [],
      consumableShop: [],
      harvestLevelRequirements: []
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
