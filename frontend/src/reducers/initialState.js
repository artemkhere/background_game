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
    currentScreen: 'LandingPage',
    userID: 0,
    jwt: ''
  }
};
