export default function setGameSessionStateReference(
  gameSessionState,
  socket
) {
  return () => {
    socket.emit('updateGameSession', {
      gameSaveID: gameSessionState.gameSaveID,
      resources: gameSessionState.resources,
      gameState: gameSessionState.gameState,
      gameHistory: gameSessionState.gameHistory,
      gameSchema: gameSessionState.gameSchema
    });
  }
}
