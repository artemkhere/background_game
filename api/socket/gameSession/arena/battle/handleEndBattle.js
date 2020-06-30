export default function handleEndBattle(
  gameSessionState,
  data,
  socket
) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;
  const gameState = getGameState();
  let logUpdate;

  if (data.concession || !gameState.arena.battle.heroWon) {
    logUpdate = `Battle ended, winner: ${gameState.arena.battle.enemy.name}.`;
    gameState.arena.selectedHero.health = 0;
  } else {
    logUpdate = `Battle ended, winner: ${gameState.arena.battle.hero.name}.`;
    // handle EXP addition
  }

  gameState.arena.battle.log.push(logUpdate);
  gameState.inBattle = false;
  setGameState(gameState);
}
