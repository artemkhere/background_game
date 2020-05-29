import handleBuyConsumable from './handleBuyConsumable.js';
import handleRemoveConsumable from './handleRemoveConsumable.js';

export default function handleConsumableAction(
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
    case 'buy':
      handleBuyConsumable(
        gameSessionState,
        handleUpdateGameSession,
        data.consumableName,
        socket
      );
      break;
    case 'remove':
      handleRemoveConsumable(
        gameSessionState,
        handleUpdateGameSession,
        targetIndex,
        targetDescription,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }
}
