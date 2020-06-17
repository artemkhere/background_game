import calculateCycles from './calculateCycles.js';

export default function handleConsumablesHarvest(consumables) {
  const now = Date.now();
  let consumablesHarvest = 0;

  const harvestedConsumables = consumables.map((consumable) => {
    const { lastCycle, effect, purchased } = consumable;
    let cycles = calculateCycles(lastCycle);

    // harvest idle consumable resources
    if (cycles > effect.cycles) {
      cycles = effect.cycles;
      consumablesHarvest += effect.amount * cycles;
      return undefined;
    }

    let updatedConsumable = {...consumable};

    // harvest and update consumable harvest cycle
    if (cycles > 0) {
      consumablesHarvest += effect.amount * cycles;
      updatedConsumable.lastCycle = now;
    }

    // consumable expired
    if (now > purchased + effect.cycles * 10000) {
      updatedConsumable = undefined;
    }

    return updatedConsumable;
  });

  const newConsumables = harvestedConsumables.filter((consumable) => {
    return consumable !== undefined;
  });

  return { consumablesHarvest, newConsumables };
}
