export default function handleAreaClicked(resources, setResources, gameState, gameSaveID, socket) {
  const updatedResources = resources + 1;
  setResources(updatedResources);
  socket.emit('updateGameSession', {
    gameSaveID,
    resources: updatedResources,
    gameState
  });
}
