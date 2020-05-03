import handleGameSessionSetup from './gameSession/gameSessionSetup.js';

export default function setupSocketApi(socket) {
  handleGameSessionSetup(socket);
}
