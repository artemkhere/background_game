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
      model: undefined,
      health: undefined,
      mana: undefined
    },
    heroRoster: [], // limited to 1 - in the future 5?
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
