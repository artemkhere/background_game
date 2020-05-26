import applyEffect from './applyEffect.js';

export default function handleHarvestResources(
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

  const gameState = getGameState();
  const builtStructures = gameState.structures.built;
  const equippedItems = gameState.items.equipped;
  let harvestValue = 0;
  let cycles = 1;

  builtStructures.forEach(({ name, effect }) => {
    let { impact, amount } = effect.harvest;

    equippedItems.forEach((item) => {
      const itemStructuresEffect = item.effect.structures;
      if (itemStructuresEffect.names.includes(name)) {
        amount = applyEffect(amount, itemStructuresEffect);
      }
    });

    harvestValue = applyEffect(harvestValue, { impact, amount });
  });

  equippedItems.forEach(({ effect }) => {
    harvestValue = applyEffect(harvestValue, effect.harvest);
  });

  // harvest all resources from when the user was away
  if (lastInteraction) {
    const lastCycle = lastInteraction.getTime();
    cycles = Math.floor((Date.now() - lastCycle) / 1000)
  }

  const updatedResources = getResources() + harvestValue * cycles;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + harvestValue;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
