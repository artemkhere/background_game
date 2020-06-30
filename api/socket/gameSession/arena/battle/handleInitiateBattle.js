import initiateCharacterBuild from '../character/initiateCharacterBuild.js';

export default function initiateBattle(
  gameSessionState,
  data,
  socket
) {
  const {
    getGameState,
    setGameState
  } = gameSessionState;

  const gameState = getGameState();

  // const hero = gameState.arena.selectedHero; // proper place to grab the hero model
  const hero = {
    name: 'Jabronie',
    health: 25,
    attributes: {
      dexterity: 3, // hit chance, crit chance
      agility: 3, // dodge chance, crit dmg multiplier, who goes first
      stamina: 5, // amount of health
      strength: 2 // dmg done
    },
    equipped: {
      weapon: undefined,
      ring: undefined,
      amulet: undefined,
      head: undefined,
      body: undefined,
      legs: {
        name: 'Poopy booties',
        rarity: 'common',
        effects: {
          dexterity: 1,
          damage: 1,
          hitChance: 0.05
        }
      },
      feet: undefined,
    },
    moves: ['smack']
  }

  if (!hero) {
    socket.emit('operationFailed', { message: "No hero selected." });
    return;
  }

  gameState.inBattle = true;
  gameState.arena.battle = {
    created: Date.now(),
    hero: initiateCharacterBuild(hero, hero.health),
    enemy: initiateCharacterBuild(hero), // randomly generated in the future or pulled from db
    log: [`Battle started between ${hero.name} and ${hero.name}.`],
    turn: 0,
    heroEffects: [], // [{ name: 'poison', targetStat: 'health', effect: '-2' }]
    enemyEffects: [],
    lastTurnTaken: undefined,
    winner: undefined,
    heroWon: undefined,
    battleShouldEnd: false
  }

  setGameState(gameState);
}
