export default function handleAreaClicked(
  gameSessionState,
  handleUpdateGameSession,
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

  let clickValue = 1;
  const gameState = getGameState();

  // first pass over structures can modify their clickEffect
  // via equippedItemsStructureEffect

  const builtStructures = gameState.structures.built;
  builtStructures.forEach(({ clickEffect }) => {
    clickValue = clickEffect(clickValue, gameState);
  });

  const equippedItems = gameState.items.equipped;
  equippedItems.forEach(({ clickEffect }) => {
    clickValue = clickEffect(clickValue, gameState);
  });

  const updatedResources = getResources() + clickValue;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + clickValue;
  newHistory.clicks = newHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
