import gameSchema from '../initialStates/gameSchema.js';

export default function handleBuyEquipSlot(
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
  const availableEquipSlots = gameState.items.availableEquipSlots;
  const equipSlotPrice = gameSchema.itemEquipSlotPrices[availableEquipSlots];

  if (!equipSlotPrice) {
    socket.emit('operationFailed', { message: "Maximum equip slots reached." });
    return;
  }

  if (getResources() < equipSlotPrice) {
    socket.emit('operationFailed', { message: "Not enogh resources." });
    return;
  }

  const newGameState = {...gameState};
  newGameState.items.availableEquipSlots += 1;
  setGameState(newGameState);

  const newResources = getResources() - equipSlotPrice;
  setResources(newResources);

  handleUpdateGameSession();
}
