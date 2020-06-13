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
  } = gameState.items

  if (equipped.length >= availableEquipSlots) {
    socket.emit('operationFailed', { message: `Can't equip more than ${availableEquipSlots} items.` });
    return;
  }

  const newGameState = {...gameState};

  let itemIndex;
  const item = inventory.find(({ name }, index) => {
    if (name === itemName) { itemIndex = index; }
    return name === itemName;
  });

  if (!item) {
    socket.emit('operationFailed', { message: "Item is not in the inventory." });
    return;
  }

  newGameState.items.equipped.push(item);
  newGameState.items.inventory.splice(itemIndex, 1);
  setGameState(newGameState);

  handleUpdateGameSession();
}
