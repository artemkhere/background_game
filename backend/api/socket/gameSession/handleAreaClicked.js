function applyClickEffect(currentValue, effect, targets) {
  let newValue = currentValue;
  const { impact, amount } = effect;

  switch (impact) {
    case 'mul':
      newValue = newValue * amount;
      break;
    default:
      break;
  }

  return newValue;
}

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
  equippedItems.forEach(({ effect }) => {
    clickValue = applyClickEffect(clickValue, effect.allClicks);
  });

  const updatedResources = getResources() + clickValue;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + clickValue;
  newHistory.clicks = newHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
