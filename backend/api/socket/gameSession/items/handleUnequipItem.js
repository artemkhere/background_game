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
  const targetItem = newGameState.items.equipped[equippedIndex];

  if (!targetItem) {
    socket.emit('operationFailed', { message: "No item to unequip." });
    return;
  }

  newGameState.items.inventory.push(targetItem);
  newGameState.items.equipped.splice(equippedIndex, 1);
  setGameState(newGameState);

  handleUpdateGameSession();
}
