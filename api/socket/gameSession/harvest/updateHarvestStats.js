import applyEffect from './applyEffect.js';

export default function updateHarvestStats(gameSessionState) {
  const {
    getGameState,
    setGameState,
  } = gameSessionState;

  const gameState = getGameState();
  const builtStructures = gameState.harvest.structures.built;
  const equippedItems = gameState.harvest.items.equipped;
  let harvestValue = 0;

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

  gameState.harvest.resourcesPerCycle = harvestValue;

  setGameState(gameState);
}
