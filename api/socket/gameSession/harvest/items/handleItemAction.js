import handleBuyItem from './handleBuyItem.js';
import handleSellItem from './handleSellItem.js';
import handleEquipItem from './handleEquipItem.js';
import handleUnequipItem from './handleUnequipItem.js';
import handleBuyEquipSlot from './handleBuyEquipSlot.js';

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
        data.itemName,
        socket
      );
      break;
    case 'sell':
      handleSellItem(
        gameSessionState,
        data.itemName,
        socket
      );
      break;
    case 'equip':
      handleEquipItem(
        gameSessionState,
        data.itemName,
        socket
      );
      break;
    case 'unequip':
      handleUnequipItem(
        gameSessionState,
        data.equippedIndex,
        socket
      );
      break;
    case 'buyEquipSlot':
      handleBuyEquipSlot(
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
