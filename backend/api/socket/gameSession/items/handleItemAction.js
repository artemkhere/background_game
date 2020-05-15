import handleBuyItem from './handleBuyItem.js';

export default function handleItemAction(
  resources,
  setResources,
  gameState,
  setGameState,
  gameSaveID,
  socket,
  data
) {
  if (!data || !data.actionType) {
    socket.emit('operationFailed', { message: 'Data or actionType missing.' });
    return;
  }

  switch (data.actionType) {
    case 'buy':
      handleBuyItem(
        resources,
        setResources,
        gameState,
        setGameState,
        gameSaveID,
        socket,
        data.itemName
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
  }
}
