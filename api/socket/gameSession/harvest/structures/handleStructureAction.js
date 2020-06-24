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
        data.structureName,
        socket
      );
      break;
    case 'sell':
      handleSellStructure(
        gameSessionState,
        data.builtIndex,
        socket
      );
      break;
    case 'buyBuildSlot':
      handleBuyBuildSlot(
        gameSessionState,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }

  handleUpdateGameSession();
}
