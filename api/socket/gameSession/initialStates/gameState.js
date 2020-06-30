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
      name: '',
      health: 0,
      moves: ['smack'],
      attributes: {
        dexterity: 0, // hit chance, crit chance
        agility: 0, // dodge chance, crit dmg multiplier, who goes first
        stamina: 0, // amount of health
        strength: 0 // dmg done
      },
      equipped: {
        weapon: undefined,
        ring: undefined,
        amulet: undefined,
        head: undefined,
        body: undefined,
        legs: undefined
      }
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
      heroWon: undefined,
      battleShouldEnd: false
    }
  },
  inBattle: false
}
