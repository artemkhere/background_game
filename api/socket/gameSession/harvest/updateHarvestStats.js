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
  let clickValue = 1;

  builtStructures.forEach(({ name, effect }) => {
    const { harvest, clicks } = effect;
    let harvestAmount = harvest.amount;
    let clicksAmount = clicks.amount;

    equippedItems.forEach((item) => {
      const itemStructuresEffect = item.effect.structures;
      if (itemStructuresEffect.names.includes(name)) {
        harvestAmount = applyEffect(harvestAmount, itemStructuresEffect);
        clicksAmount = applyEffect(clicksAmount, itemStructuresEffect);
      }
    });

    harvestValue = applyEffect(harvestValue, { impact: harvest.impact, amount: harvestAmount });
    clickValue = applyEffect(clickValue, { impact: clicks.impact, amount: clicksAmount });
  });

  equippedItems.forEach(({ effect }) => {
    harvestValue = applyEffect(harvestValue, effect.harvest);
    clickValue = applyEffect(clickValue, effect.clicks);
  });

  gameState.harvest.resourcesPerCycle = harvestValue;
  gameState.harvest.resourcesPerClick = clickValue;

  setGameState(gameState);
}
