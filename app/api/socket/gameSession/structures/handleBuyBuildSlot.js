import gameSchema from '../initialStates/gameSchema.js';

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
  const availableBuildSlots = gameState.structures.availableBuildSlots;
  const buildSlotPrice = gameSchema.structureBuildSlotPrices[availableBuildSlots];

  if (!buildSlotPrice) {
    socket.emit('operationFailed', { message: "Maximum build slots reached." });
    return;
  }

  if (getResources() < buildSlotPrice) {
    socket.emit('operationFailed', { message: "Not enogh resources." });
    return;
  }

  const newGameState = {...gameState};
  newGameState.structures.availableBuildSlots += 1;
  setGameState(newGameState);

  const newResources = getResources() - buildSlotPrice;
  setResources(newResources);

  handleUpdateGameSession();
}
