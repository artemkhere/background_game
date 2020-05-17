import setupItemShop from './setupItemShop.js';

export default function handleSellItem(
  resources,
  setResources,
  gameState,
  setGameState,
  gameSaveID,
  socket,
  itemName
) {
  if (!itemName) {
    socket.emit('operationFailed', { message: "No itemName." });
    return;
  }

  const itemShop = setupItemShop(gameState);
  const item = itemShop.find(({ name }) => { return name === itemName; });
  if (!item) {
    socket.emit('operationFailed', { message: "There is no item with that name." });
    return;
  }

  const inventory = gameState.items.inventory;
  const itemNotPresentInInventory = !inventory.find(({ name }) => { return name === itemName; });

  if (itemNotPresentInInventory) {
    socket.emit('operationFailed', { message: "Item is not in inventory." });
    return;
  }

  const newResources = resources + item.price;
  setResources(newResources);

  const newGameState = {...gameState};
  const newInventory = [...inventory];
  newGameState.items.inventory = newInventory;
  setGameState(newGameState);

  socket.emit('updateGameSession', {
    gameSaveID,
    resources: newResources,
    gameState: newGameState
  });
}
