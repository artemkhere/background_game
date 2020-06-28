export default
{
  harvest: {
    items: {
      equipped: [],
      availableEquipSlots: 1,
      inventory: []
    },
    structures: {
      built: [],
      availableBuildSlots: 1
    },
    consumables: [],
    lastCycle: undefined,
  },
  arena: {
    selectedHero: {
      name: undefined,
      attributes: undefined,
      health: undefined,
      equipped: undefined
    },
    inventory: [], // limited to 50 items
    battle: {
      created: undefined,
      hero: undefined,
      enemy: undefined,
      log: [],
      turn: 0,
      heroEffects: [],
      enemEffects: [],
      lastTurnTaken: undefined,
      winner: undefined
    }
  },
  inBattle: false
}
