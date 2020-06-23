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

  const gameState = getGameState();
  const targetItem = gameState.harvest.items.equipped[equippedIndex];

  if (!targetItem) {
    socket.emit('operationFailed', { message: "No item to unequip." });
    return;
  }

  gameState.harvest.items.inventory.push(targetItem);
  gameState.harvest.items.equipped.splice(equippedIndex, 1);
  setGameState(gameState);

  handleUpdateGameSession();
}
