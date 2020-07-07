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
      name: 'Pickle Juice',
      health: 11,
      moves: ['smack', 'nap', 'lick'],
      level: 1,
      experience: 0,
      availablePoints: 0,
      attributes: {
        dexterity: 5, // hit chance, crit chance
        agility: 5, // dodge chance, crit dmg multiplier, who goes first
        stamina: 5, // amount of health
        strength: 5 // dmg done
      },
      equipped: {
        weapon: undefined,
        ring: undefined,
        amulet: undefined,
        head: undefined,
        body: undefined,
        legs: undefined
      },
    },
    inventory: [], // limited to 50 items
    battle: {
      created: undefined,
      enemyModel: undefined,
      hero: undefined,
      enemy: undefined,
      log: [],
      turn: 0,
      lastTurnTaken: undefined,
      heroWon: undefined,
      battleShouldEnd: false
    }
  },
  inBattle: false,
}
