import applyEffect from '../applyEffect.js';
import calculateCycles from './calculateCycles.js';
import handleConsumablesHarvest from './handleConsumablesHarvest.js';

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
  const consumables = newGameState.consumables;
  let harvestValue = 0;
  const now = Date.now();

  const { consumablesHarvest, newConsumables } = handleConsumablesHarvest(consumables);
  newGameState.consumables = newConsumables;

  if (!newGameState.lastCycle) { newGameState.lastCycle = now; }
  const cycles = calculateCycles(newGameState.lastCycle);
  if (cycles > 0) { newGameState.lastCycle = now; }

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

  const updatedResources = getResources() + harvestValue * cycles + consumablesHarvest;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + harvestValue;
  setGameHistory(newHistory);

  setGameState(newGameState);

  handleUpdateGameSession();
}
