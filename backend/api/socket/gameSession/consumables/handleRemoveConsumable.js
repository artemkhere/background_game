export default function handleRemoveConsumable(
  gameSessionState,
  handleUpdateGameSession,
  targetIndex,
  targetDescription,
  socket
) {
  const {
    getGameState,
    setGameState,
  } = gameSessionState;

  const newGameState = {...getGameState()};
  const target = newGameState.consumables[targetIndex];

  if (!target || JSON.stringify(target) !== JSON.stringify(targetDescription)) {
    socket.emit('operationFailed', { message: "Wrong target, consumable was not removed." });
    return;
  }

  newGameState.consumables.splice(targetIndex, 1);
  setGameState(newGameState);

  handleUpdateGameSession();
}
