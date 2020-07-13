import initiateCharacterBuild from './initiateCharacterBuild.js';
import statCalculators from './statCalculators.js';

const { calculateHealth } = statCalculators;

export default function handleHealCharacter(
  gameSessionState,
  socket
) {
  const {
    getGameState,
    setGameState,
    getResources,
    setResources
  } = gameSessionState;

  const gameState = getGameState();
  let hero = {...gameState.arena.selectedHero};
  hero = initiateCharacterBuild(hero, hero.health);

  const currentHealth = hero.stats.health;
  const maxHealth = calculateHealth(hero.attributes.stamina, hero.equipped);
  let maxHeal = maxHealth - currentHealth;

  if (maxHeal <= 0) {
    socket.emit('operationFailed', { message: 'Already at maximum health.' });
    return;
  }

  let resources = getResources();
  const canAffordToHeal = Math.floor(resources / 10);
  if (maxHeal > canAffordToHeal) { maxHeal = canAffordToHeal; }

  gameState.arena.selectedHero.health += maxHeal;
  setGameState(gameState);

  resources -= maxHeal * 10;
  setResources(resources);
}
