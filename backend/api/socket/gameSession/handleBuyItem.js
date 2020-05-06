export default function handleBuyItem(resources, setResources, gameState, setGameState, gameSaveID, socket, data) {
  if (resources >= 5) {
    const newResources = resources - 5;
    setResources(newResources);
    const newGameState = {...gameState};
    newGameState.items.push('New Item');
    setGameState(newGameState);
    socket.emit('updateGameSession', {
      gameSaveID,
      resources: newResources,
      gameState: newGameState
    });
  } else {
    socket.emit('operationFailed', { reason: 'Not enough resources' });
  }
}
