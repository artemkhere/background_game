export default function handleEquipItem(
  gameSessionState,
  handleUpdateGameSession,
  itemName,
  socket
) {
  const { getGameState, setGameState } = gameSessionState;

  if (!itemName) {
    socket.emit('operationFailed', { message: "No itemName." });
    return;
  }

  if (getGameState().items.equipped.length >= 3) {
    socket.emit('operationFailed', { message: "Can't equip more than 3 items." });
    return;
  }

  const newGameState = {...getGameState()};
  const newInventory = [...newGameState.items.inventory];
  const newEquipped = [...newGameState.items.equipped];

  let itemIndex;
  const item = newInventory.find(({ name }, index) => {
    if (name === itemName) { itemIndex = index; }
    return name === itemName;
  });

  if (!item) {
    socket.emit('operationFailed', { message: "Item is not in the inventory." });
    return;
  }

  newEquipped.push(item);
  newGameState.items.equipped = newEquipped;
  newInventory.splice(itemIndex, 1);
  newGameState.items.inventory = newInventory;
  setGameState(newGameState);

  handleUpdateGameSession();
}
