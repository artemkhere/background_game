import setupItemShop from './setupItemShop.js';

export default function handleSellItem(
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

  const inventory = getGameState().items.inventory;
  let itemIndex;
  const itemNotPresentInInventory = !inventory.find(({ name }, index) => {
    if (name === itemName) { itemIndex = index; }
    return name === itemName;
  });

  if (itemNotPresentInInventory) {
    socket.emit('operationFailed', { message: "Item is not in inventory." });
    return;
  }

  const newResources = getResources() + Math.ceil(item.price / 2);
  setResources(newResources);

  const newGameState = {...getGameState()};
  newGameState.items.inventory.splice(itemIndex, 1);
  setGameState(newGameState);

  handleUpdateGameSession();
}
