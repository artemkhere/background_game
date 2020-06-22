export default
{
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
  arena: {
    selectedHero: undefined,
    heroRoster: [], // limited to 1 - in the future 5?
    inventory: [], // limited to 50 items
    battle: {
      created: null,
      hero: null,
      enemy: null,
      log: [],
      turn: 0,
      heroEffects: [],
      enemEffects: []
    }
  },
  inBattle: false
}
