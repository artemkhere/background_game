export default function handleEquipItem(
  gameSessionState,
  handleUpdateGameSession,
  itemName,
  socket
) {
  if (!itemName) {
    socket.emit('operationFailed', { message: "No itemName." });
    return;
  }

  const { getGameState, setGameState } = gameSessionState;
  const gameState = getGameState();
  const {
    equipped,
    availableEquipSlots,
    inventory
  } = gameState.harvest.items;

  if (equipped.length >= availableEquipSlots) {
    socket.emit('operationFailed', { message: `Can't equip more than ${availableEquipSlots} items.` });
    return;
  }

  let itemIndex;
  const item = inventory.find(({ name }, index) => {
    if (name === itemName) { itemIndex = index; }
    return name === itemName;
  });

  if (!item) {
    socket.emit('operationFailed', { message: "Item is not in the inventory." });
    return;
  }

  gameState.harvest.items.equipped.push(item);
  gameState.harvest.items.inventory.splice(itemIndex, 1);
  setGameState(gameState);

  handleUpdateGameSession();
}
