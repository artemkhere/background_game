import applyEffect from './applyEffect.js';

export default function handleHarvestResources(
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

  const newGameState = {...getGameState()};
  const builtStructures = newGameState.structures.built;
  const equippedItems = newGameState.items.equipped;
  let harvestValue = 0;

  const now = Date.now();
  if (!newGameState.lastCycle) { newGameState.lastCycle = now; }
  const cycles = Math.floor((now - newGameState.lastCycle) / 10000);
  if (cycles > 0) { newGameState.lastCycle = now; }
  setGameState(newGameState);

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

  const updatedResources = getResources() + harvestValue * cycles;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + harvestValue;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
