import setupItemShop from './setupItemShop.js';

export default function handleBuyItem(
  gameSessionState,
  handleUpdateGameSession,
  itemName,
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

  if (!itemName) {
    socket.emit('operationFailed', { message: "No itemName." });
    return;
  }

  const itemShop = setupItemShop(getGameHistory());
  const item = itemShop.find(({ name }) => { return name === itemName; });
  if (!item) {
    socket.emit('operationFailed', { message: "There is no item with that name." });
    return;
  }

  if (!item.canBePurchased || getResources() < item.price) {
    socket.emit('operationFailed', { message: "Item can't be purchased." });
    return;
  }

  const resources = getResources() - item.price;
  setResources(resources);

  const gameState = getGameState();
  gameState.harvest.items.inventory.push(item);
  setGameState(gameState);

  const newHistory = {...getGameHistory()};
  newHistory.purchased.push(item);
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
