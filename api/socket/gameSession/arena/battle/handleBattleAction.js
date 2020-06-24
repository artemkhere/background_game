import handleInitiateBattle from './handleInitiateBattle.js';

export default function handleBattleAction(
  gameSessionState,
  data,
  socket
) {
  if (!data || !data.actionType) {
    socket.emit('operationFailed', { message: 'Data or actionType missing.' });
    return;
  }

  switch (data.actionType) {
    case 'initiate':
      handleInitiateBattle(
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
