export default function handleAreaClicked(
  gameSessionState,
  handleUpdateGameSession,
  socket,
  lastInteraction
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState,
    getGameHistory,
    setGameHistory
  } = gameSessionState;

  // harvest all resources from when the user was away
  if (lastInteraction) { return; }

  const gameState = getGameState();
  const builtStructures = gameState.structures.built;
  const equippedItems = gameState.items.equipped;
  let harvestValue = 0;

  builtStructures.forEach(({ name, effect }) => {
    let { impact, amount } = effect.harvest;

    equippedItems.forEach((item) => {
      const itemStructuresEffect = item.effect.structures;
      if (itemStructuresEffect.names.includes(name)) {
        amount = applyEffect(amount, itemStructuresEffect);
      }
    });

    clickValue = applyEffect(clickValue, { impact, amount });
  });

  equippedItems.forEach(({ effect }) => {
    clickValue = applyEffect(clickValue, effect.clicks);
  });

  const updatedResources = getResources() + clickValue;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + clickValue;
  newHistory.clicks = newHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
