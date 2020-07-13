import handleHealCharacter from './handleHealCharacter.js';
import handleCharacterPointsDistribution from './handleCharacterPointsDistribution.js';

export default function handleCharacterAction(
  gameSessionState,
  handleUpdateGameSession,
  data,
  socket
) {
  if (!data || !data.actionType) {
    socket.emit('operationFailed', { message: 'Data or actionType missing.' });
    return;
  }

  const inBattle = gameSessionState.getGameState().inBattle;
  if (inBattle) {
    socket.emit('operationFailed', { message: "Can't do that while in battle." });
    return;
  }

  switch (data.actionType) {
    case 'heal':
      handleHealCharacter(
        gameSessionState,
        socket
      );
      break;
    case 'distributePoints':
      handleCharacterPointsDistribution(
        gameSessionState,
        data.targets,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }

  handleUpdateGameSession();
}
