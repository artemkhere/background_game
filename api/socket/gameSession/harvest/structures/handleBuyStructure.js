import setupStructureShop from './setupStructureShop.js';

export default function handleBuyStructure(
  gameSessionState,
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

  const gameHistory = getGameHistory();
  const structureShop = setupStructureShop(gameHistory);
  const structure = structureShop.find(({ name }) => { return name === structureName; });
  if (!structure) {
    socket.emit('operationFailed', { message: "There is no structure with that name." });
    return;
  }

  const gameState = getGameState();

  if (
    !structure.canBePurchased ||
    getResources() < structure.price ||
    gameState.harvest.structures.built.length >= gameState.harvest.structures.availableBuildSlots
  ) {
    socket.emit('operationFailed', { message: "Structure can't be purchased." });
    return;
  }

  const newResources = getResources() - structure.price;
  setResources(newResources);

  gameState.harvest.structures.built.push(structure);
  setGameState(gameState);

  gameHistory.harvest.purchased.push(structure);
  setGameHistory(gameHistory);
}
