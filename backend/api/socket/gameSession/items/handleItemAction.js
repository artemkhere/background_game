import handleBuyItem from './handleBuyItem.js';
import handleSellItem from './handleSellItem.js';
import handleEquipItem from './handleEquipItem.js';
import handleUnequipItem from './handleUnequipItem.js';

export default function handleItemAction(
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
      handleBuyItem(
        gameSessionState,
        handleUpdateGameSession,
        data.itemName,
        socket
      );
      break;
    case 'sell':
      handleSellItem(
        gameSessionState,
        handleUpdateGameSession,
        data.itemName,
        socket
      );
      break;
    case 'equip':
      handleEquipItem(
        gameSessionState,
        handleUpdateGameSession,
        data.itemName,
        socket
      );
      break;
    case 'unequip':
      handleUnequipItem(
        gameSessionState,
        handleUpdateGameSession,
        data.equippedIndex,
        socket
      );
      break;
    default:
      socket.emit('operationFailed', { message: 'Unknown actionType.' });
      return;
  }
}
