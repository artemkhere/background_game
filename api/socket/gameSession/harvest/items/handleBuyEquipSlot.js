import gameSchema from '../../initialStates/gameSchema.js';

export default function handleBuyEquipSlot(
  gameSessionState,
  socket
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();
  const availableEquipSlots = gameState.harvest.items.availableEquipSlots;
  const equipSlotPrice = gameSchema.itemEquipSlotPrices[availableEquipSlots];

  if (!equipSlotPrice) {
    socket.emit('operationFailed', { message: "Maximum equip slots reached." });
    return;
  }

  if (getResources() < equipSlotPrice) {
    socket.emit('operationFailed', { message: "Not enogh resources." });
    return;
  }

  gameState.harvest.items.availableEquipSlots += 1;
  setGameState(gameState);

  const resources = getResources() - equipSlotPrice;
  setResources(resources);
}
