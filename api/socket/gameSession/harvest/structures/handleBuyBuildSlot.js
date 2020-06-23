import gameSchema from '../../initialStates/gameSchema.js';

export default function handleBuyBuildSlot(
  gameSessionState,
  handleUpdateGameSession,
  socket
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  const availableBuildSlots = gameState.harvest.structures.availableBuildSlots;
  const buildSlotPrice = gameSchema.structureBuildSlotPrices[availableBuildSlots];

  if (!buildSlotPrice) {
    socket.emit('operationFailed', { message: "Maximum build slots reached." });
    return;
  }

  if (getResources() < buildSlotPrice) {
    socket.emit('operationFailed', { message: "Not enogh resources." });
    return;
  }

  gameState.harvest.structures.availableBuildSlots += 1;
  setGameState(gameState);

  const resources = getResources() - buildSlotPrice;
  setResources(resources);

  handleUpdateGameSession();
}
