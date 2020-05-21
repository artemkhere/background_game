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
  const builtStructures = gameState.structures.built;
  const equippedItems = gameState.items.equipped;

  // apply item effects over structures
  // equippedItems.forEach(({ structureEffect }) => {
  //   builtStructures.forEach(({ clickEffect }) => {
  //     clickValue = clickEffect(clickValue, gameState);
  //   });
  // });

  // apply effects from structure
  builtStructures.forEach(({ clickEffect }) => {
    clickValue = clickEffect(clickValue, gameState);
  });

  // apply effects from items
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
