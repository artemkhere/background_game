import gameSchema from '../../initialStates/gameSchema.js';

export default function handleCharacterLevelUp(gameSessionState, socket) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  let nextLevelRequirement = gameSchema.levelRequirements[gameState.arena.selectedHero.level];

  while (gameState.arena.selectedHero.experience >= nextLevelRequirement) {
    gameState.arena.selectedHero.experience -= nextLevelRequirement;
    gameState.arena.selectedHero.level += 1;
    gameState.arena.selectedHero.availablePoints += 2;

    nextLevelRequirement = gameSchema.levelRequirements[gameState.arena.selectedHero.level];
  }

  setGameState(gameState);
}
