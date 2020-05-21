import setupStructureShop from './setupStructureShop.js';

export default function handleBuyStructure(
  gameSessionState,
  handleUpdateGameSession,
  structureName,
  socket
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState,
    getGameHistory,
    setGameHistory
  } = gameSessionState;

  if (!structureName) {
    socket.emit('operationFailed', { message: "No structureName." });
    return;
  }

  const structureShop = setupStructureShop(getGameHistory());
  const structure = structureShop.find(({ name }) => { return name === structureName; });
  if (!structure) {
    socket.emit('operationFailed', { message: "There is no structure with that name." });
    return;
  }

  const gameState = getGameState();

  if (
    !structure.canBePurchased ||
    getResources() < structure.price ||
    gameState.structures.built.length >= gameState.structures.availableBuildSlots
  ) {
    socket.emit('operationFailed', { message: "Structure can't be purchased." });
    return;
  }

  const newResources = getResources() - structure.price;
  setResources(newResources);

  const newGameState = {...gameState};
  newGameState.structures.built.push(structure);
  setGameState(newGameState);

  const newHistory = {...getGameHistory()};
  newHistory.structures.purchased.push(structure);
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
