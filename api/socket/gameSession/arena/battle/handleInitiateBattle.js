import initiateCharacterBuild from '../character/initiateCharacterBuild.js';
import gameSchema from '../../initialStates/gameSchema.js';

export default function initiateBattle(
  gameSessionState,
  data,
  socket
) {
  const {
    getGameState,
    setGameState,
    getResources,
    setResources
  } = gameSessionState;

  const gameState = getGameState();
  const hero = gameState.arena.selectedHero;
  const enemy = {
    name: 'Jabronie',
    health: 25,
    level: 1,
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
    moves: ['smack', 'nap', 'lick'],
    effects: []
  }

  if (!hero) {
    socket.emit('operationFailed', { message: 'No hero selected.' });
    return;
  }

  const { battlePrices } = gameSchema;
  let costToInitiateBattle = battlePrices[gameState.arena.selectedHero.level];
  if (!costToInitiateBattle) {
    costToInitiateBattle = battlePrices[battlePrices.length - 1];
  }

  let resources = getResources();
  if (costToInitiateBattle > resources) {
    socket.emit('operationFailed', { message: 'No enought resources.' });
    return;
  } else {
    setResources(resources - costToInitiateBattle);
  }

  gameState.inBattle = true;
  gameState.arena.battle = {
    created: Date.now(),
    hero: initiateCharacterBuild(hero, hero.health),
    enemy: initiateCharacterBuild(enemy), // randomly generated in the future or pulled from db
    log: [`Battle started between ${hero.name} and ${enemy.name}.`],
    turn: 0,
    lastTurnTaken: undefined,
    winner: undefined,
    heroWon: undefined,
    battleShouldEnd: false
  }

  setGameState(gameState);
}
