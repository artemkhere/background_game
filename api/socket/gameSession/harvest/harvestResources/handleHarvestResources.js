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

  const gameState = getGameState();
  const builtStructures = gameState.harvest.structures.built;
  const equippedItems = gameState.harvest.items.equipped;
  const consumables = gameState.harvest.consumables;
  let harvestValue = 0;
  const now = Date.now();

  const { consumablesHarvest, newConsumables } = handleConsumablesHarvest(consumables);
  gameState.harvest.consumables = newConsumables;

  if (!gameState.harvest.lastCycle) { gameState.harvest.lastCycle = now; }
  const cycles = calculateCycles(gameState.harvest.lastCycle);
  if (cycles > 0) { gameState.harvest.lastCycle = now; }

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

  setGameState(gameState);

  handleUpdateGameSession();
}
