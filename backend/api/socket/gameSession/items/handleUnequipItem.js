export default function handleUnequipItem(
  gameSessionState,
  handleUpdateGameSession,
  equippedIndex,
  socket
) {
  const { getGameState, setGameState } = gameSessionState;

  if (equippedIndex === undefined) {
    socket.emit('operationFailed', { message: "No target." });
    return;
  }

  const newGameState = {...getGameState()};
  const newInventory = [...getGameState().items.inventory];
  const newEquipped = [...getGameState().items.equipped];
  const targetItem = newGameState.items.equipped[equippedIndex];

  if (!targetItem) {
    socket.emit('operationFailed', { message: "No item to unequip." });
    return;
  }

  newInventory.push(targetItem);
  newGameState.items.inventory = newInventory;
  newEquipped.splice(equippedIndex, 1);
  newGameState.items.equipped = newEquipped;
  setGameState(newGameState);

  handleUpdateGameSession();
}
