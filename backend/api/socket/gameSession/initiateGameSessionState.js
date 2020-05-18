import setupGameSchema from './setupGameSchema.js';

export default function initiateGameSessionState(
  gameSaveID,
  resources,
  gameState,
  gameHistory
) {
  const setResources = (newResources) => { resources = newResources; }
  const setGameState = (newState) => { gameState = newState; }

  let gameSchema = setupGameSchema(newHistory);
  const setGameHistory = (newHistory) => {
    gameHistory = newHistory;
    gameSchema = setupGameSchema(newHistory);
  }

  return {
    gameSaveID,
    resources,
    setResources,
    gameState,
    setGameState,
    gameHistory,
    setGameHistory,
    gameSchema
  }
}
