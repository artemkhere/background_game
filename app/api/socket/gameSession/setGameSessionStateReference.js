export default function setGameSessionStateReference(
  gameSessionState,
  socket
) {
  return () => {
    socket.emit('updateGameSession', {
      gameSaveID: gameSessionState.getGameSaveID(),
      resources: gameSessionState.getResources(),
      gameState: gameSessionState.getGameState(),
      gameHistory: gameSessionState.getGameHistory(),
      gameSchema: gameSessionState.getGameSchema()
    });
  }
}
