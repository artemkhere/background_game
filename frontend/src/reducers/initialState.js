export default {
  socket: {
    error: undefined,
    timeout: undefined,
    loading: undefined,
    data: {}
  },
  gameSession: {
    gameSessionID: 0,
    resources: 0,
    gameState: {
      items: []
    }
  },
  applicationState: {
    currentScreen: 'LandingPage'
  },
  user: {
    id: 0,
    email: '',
    loggedIn: false
  }
};
