import gameSchema from '../../initialStates/gameSchema.js';

export default function handleCharacterLevelUp(gameSessionState, socket) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  const characterLevelRequirements = gameSchema.characterLevelRequirements;

  if (characterLevelRequirements.length <= gameState.arena.selectedHero.level) { return; }
  let nextLevelRequirement = characterLevelRequirements[gameState.arena.selectedHero.level];

  while (
    characterLevelRequirements.length >= gameState.arena.selectedHero.level
    && gameState.arena.selectedHero.experience >= nextLevelRequirement
  ) {
    gameState.arena.selectedHero.experience -= nextLevelRequirement;
    gameState.arena.selectedHero.level += 1;
    gameState.arena.selectedHero.availablePoints += 2;

    nextLevelRequirement = characterLevelRequirements[gameState.arena.selectedHero.level];
  }

  setGameState(gameState);
}
