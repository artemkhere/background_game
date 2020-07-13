export default function handleCharacterPointsDistribution(
  gameSessionState,
  targets,
  socket
) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();

  const availablePoints = gameState.arena.selectedHero.availablePoints;
  const totalPointsToDistribute = targets.reduce((acc, target) => {
    return acc + target.amount;
  }, 0);

  if (availablePoints < totalPointsToDistribute) {
    socket.emit('operationFailed', { message: 'Not enough points.' });
    return;
  }

  targets.forEach(({ target, amount }) => {
    gameState.arena.selectedHero.attributes[target] += amount;
    gameState.arena.selectedHero.availablePoints -= amount;
  });

  setGameState(gameState);
}
