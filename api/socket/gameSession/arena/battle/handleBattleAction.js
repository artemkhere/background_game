import handleInitiateBattle from './handleInitiateBattle.js';
import handleTakeTurn from './handleTakeTurn.js';

export default function handleBattleAction(
  gameSessionState,
  handleUpdateGameSession,
  data,
  socket
) {
  if (!data || !data.actionType) {
    socket.emit('operationFailed', { message: 'Data or actionType missing.' });
    return;
  }

  switch (data.actionType) {
    case 'initiateBattle':
      handleInitiateBattle(
        gameSessionState,
        data,
        socket
      );
      break;
    case 'takeTurn':
      handleTakeTurn(
        gameSessionState,
        data,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }

  handleUpdateGameSession();
}
