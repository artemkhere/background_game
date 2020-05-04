export default function handleAreaClicked(resources, setResources, gameState, socket) {
  const updatedResources = resources + 1;
  setResources(updatedResources);
  socket.emit('updateGameSession', { resources: updatedResources, gameState });
}
