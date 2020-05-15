import handleSetupGameSession from './gameSession/setupGameSession.js';

export default function setupSocketApi(socket) {
  handleSetupGameSession(socket);
}
