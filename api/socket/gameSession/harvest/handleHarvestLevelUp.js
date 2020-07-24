import gameSchema from '../initialStates/gameSchema.js';

export default function handleHarvestLevelUp(gameSessionState) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  const harvestLevelRequirements = gameSchema.harvestLevelRequirements;

  if (harvestLevelRequirements.length <= gameState.harvest.level) { return; }
  let nextLevelRequirement = harvestLevelRequirements[gameState.harvest.level];

  while (
    harvestLevelRequirements.length >= gameState.harvest.level
    && gameState.harvest.experience >= nextLevelRequirement
  ) {
    gameState.harvest.experience -= nextLevelRequirement;
    gameState.harvest.level += 1;

    nextLevelRequirement = harvestLevelRequirements[gameState.harvest.level];
  }

  setGameState(gameState);
}
