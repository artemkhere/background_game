import setupStructureShop from './setupStructureShop.js';

export default function handleSellStructure(
  gameSessionState,
  builtIndex,
  socket
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState,
    getGameHistory
  } = gameSessionState;

  if (builtIndex === undefined) {
    socket.emit('operationFailed', { message: "No target." });
    return;
  }

  const gameState = getGameState();
  const targetStructure = gameState.harvest.structures.built[builtIndex];

  if (!targetStructure) {
    socket.emit('operationFailed', { message: "Structure is not in slots." });
    return;
  }

  const structureShop = setupStructureShop(getGameHistory());
  const structureNotInShop = !structureShop.find(({ name }) => { return name === targetStructure.name; });
  if (structureNotInShop) {
    socket.emit('operationFailed', { message: "There is no structure with that name in shop." });
    return;
  }

  const resources = getResources() + Math.ceil(targetStructure.price / 2);
  setResources(resources);

  gameState.harvest.structures.built.splice(builtIndex, 1);
  setGameState(gameState);
}
