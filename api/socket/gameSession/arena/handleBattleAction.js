import handleInitiateBattle from './handleInitiateBattle.js';

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
    case 'initiate':
      handleInitiateBattle(
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
    case 'buyEquipSlot':
      handleBuyEquipSlot(
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
