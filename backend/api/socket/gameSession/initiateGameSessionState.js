import setupGameSchema from './setupGameSchema.js';

export default function initiateGameSessionState(
  gameSaveID,
  resources,
  gameState,
  gameHistory
) {
  let resourcesReference = resources;
  const getResources = () => { return resourcesReference; }
  const setResources = (newResources) => { resourcesReference = newResources; }
  
  const setGameState = (newState) => { gameState = newState; }

  let gameSchema = setupGameSchema(gameHistory);
  const setGameHistory = (newHistory) => {
    gameHistory = newHistory;
    gameSchema = setupGameSchema(newHistory);
  }

  return {
    gameSaveID,
    getResources,
    setResources,
    gameState,
    setGameState,
    gameHistory,
    setGameHistory,
    gameSchema
  }
}
