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
  const inventory = [...newGameState.items.inventory];

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
