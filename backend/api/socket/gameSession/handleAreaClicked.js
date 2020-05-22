function applyEffect(currentValue, effect) {
  let newValue = currentValue;
  const { impact, amount } = effect;

  switch (impact) {
    case 'mul':
      newValue = newValue * amount;
      break;
    case 'plus':
      newValue = newValue + amount;
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

  // apply effects from structure
  builtStructures.forEach(({ name, effect }) => {
    let { impact, amount } = effect.allClicks;

    equippedItems.forEach((item) => {
      const itemStructuresEffect = item.effect.structures;
      if (itemStructureEffect.names.includes(name)) {
        amount = applyEffect(amount, itemStructuresEffect);
      }
    });

    clickValue = applyEffect(clickValue, { impact, amount });
  });

  // apply effects from items
  equippedItems.forEach(({ effect }) => {
    clickValue = applyEffect(clickValue, effect.allClicks);
  });

  const updatedResources = getResources() + clickValue;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + clickValue;
  newHistory.clicks = newHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
