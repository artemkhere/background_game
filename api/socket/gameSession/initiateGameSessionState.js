import setupGameSchema from './setupGameSchema.js';

export default function initiateGameSessionState(
  gameSaveID,
  resources,
  gameState,
  gameHistory
) {
  const getGameSaveID = () => { return gameSaveID; }

  let resourcesReference = resources;
  const getResources = () => { return resourcesReference; }
  const setResources = (newResources) => { resourcesReference = newResources; }

  let gameStateReference = {...gameState};
  const getGameState = () => { return {...gameStateReference}; }
  const setGameState = (newState) => { gameStateReference = {...newState}; }

  let gameHistoryReference = {...gameHistory};
  const getGameHistory = () => { return {...gameHistoryReference}; }
  const setGameHistory = (newHistory) => {
    gameHistoryReference = {...newHistory};
    gameSchemaReference = setupGameSchema(gameHistoryReference, gameStateReference);
  }

  let gameSchemaReference = setupGameSchema(gameHistoryReference, gameStateReference);
  const getGameSchema = () => { return {...gameSchemaReference}; }

  return {
    getGameSaveID,
    getResources,
    setResources,
    getGameState,
    setGameState,
    getGameHistory,
    setGameHistory,
    getGameSchema
  }
}
