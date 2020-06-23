import setupConsumableShop from './setupConsumableShop.js';

export default function handleBuyConsumable(
  gameSessionState,
  handleUpdateGameSession,
  consumableName,
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

  if (!consumableName) {
    socket.emit('operationFailed', { message: "No consumableName." });
    return;
  }

  const newGameState = getGameState();
  const consumableShop = setupConsumableShop(getGameHistory(), newGameState);
  const consumable = consumableShop.find(({ name }) => { return name === consumableName; });
  if (!consumable) {
    socket.emit('operationFailed', { message: "There is no consumable with that name." });
    return;
  }

  const resources = getResources();
  if (!consumable.shouldDisplay || resources < consumable.price) {
    socket.emit('operationFailed', { message: "Consumable can't be purchased." });
    return;
  }

  const newResources = resources - consumable.price;
  setResources(newResources);

  const newConsumable = {...consumable};
  newConsumable.purchased = Date.now();
  newGameState.consumables.push(newConsumable);
  setGameState(newGameState);

  const newHistory = getGameHistory();
  newHistory.purchased.push(consumable);
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
