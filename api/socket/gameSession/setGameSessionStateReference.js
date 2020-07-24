import updateHarvestStats from './harvest/updateHarvestStats';

export default function setGameSessionStateReference(
  gameSessionState,
  socket
) {
  return () => {
    updateHarvestStats(gameSessionState);

    socket.emit('updateGameSession', {
      gameSaveID: gameSessionState.getGameSaveID(),
      resources: gameSessionState.getResources(),
      gameState: gameSessionState.getGameState(),
      gameHistory: gameSessionState.getGameHistory(),
      gameSchema: gameSessionState.getGameSchema()
    });
  }
}
