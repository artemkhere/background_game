import handleBuyStructure from './handleBuyStructure.js';
import handleSellStructure from './handleSellStructure.js';
import handleBuyBuildSlot from './handleBuyBuildSlot.js';

export default function handleStructureAction(
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
      handleBuyStructure(
        gameSessionState,
        handleUpdateGameSession,
        data.structureName,
        socket
      );
      break;
    case 'sell':
      handleSellStructure(
        gameSessionState,
        handleUpdateGameSession,
        data.builtIndex,
        socket
      );
      break;
    case 'buyBuildSlot':
      handleBuyBuildSlot(
        gameSessionState,
        handleUpdateGameSession,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }
}
