import setupItemShop from './setupItemShop.js';

export default function handleBuyItem(
  gameSessionState,
  handleUpdateGameSession,
  itemName,
  socket
) {
  const {
    resources,
    setResources,
    gameState,
    setGameState,
    gameHistory,
    setGameHistory
  } = gameSessionState;

  if (!itemName) {
    socket.emit('operationFailed', { message: "No itemName." });
    return;
  }

  const itemShop = setupItemShop(gameHistory);
  const item = itemShop.find(({ name }) => { return name === itemName; });
  if (!item) {
    socket.emit('operationFailed', { message: "There is no item with that name." });
    return;
  }

  if (!item.canBePurchased || resources < item.price) {
    socket.emit('operationFailed', { message: "Item can't be purchased." });
    return;
  }

  const newResources = resources - item.price;
  setResources(newResources);

  const newGameState = {...gameState};
  newGameState.items.inventory.push(item);
  setGameState(newGameState);

  const newHistory = {...gameHistory};
  newHistory.items.purchased.push(item);
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
