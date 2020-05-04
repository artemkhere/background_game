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
      items: []
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
