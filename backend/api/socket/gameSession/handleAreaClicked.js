import applyEffect from './applyEffect.js';

export default function handleAreaClicked(
  gameSessionState,
  handleUpdateGameSession,
  socket
) {
  const {
    getResources,
    setResources,
    getGameState,
    setGameState,
    getGameHistory,
    setGameHistory
  } = gameSessionState;

  const gameState = getGameState();
  const builtStructures = gameState.structures.built;
  const equippedItems = gameState.items.equipped;
  let clickValue = 1;

  builtStructures.forEach(({ name, effect }) => {
    let { impact, amount } = effect.clicks;

    equippedItems.forEach((item) => {
      const itemStructuresEffect = item.effect.structures;
      if (itemStructuresEffect.names.includes(name)) {
        amount = applyEffect(amount, itemStructuresEffect);
      }
    });

    clickValue = applyEffect(clickValue, { impact, amount });
  });

  equippedItems.forEach(({ effect }) => {
    clickValue = applyEffect(clickValue, effect.clicks);
  });

  const updatedResources = getResources() + clickValue;
  setResources(updatedResources);

  const newHistory = {...getGameHistory()};
  newHistory.resources = newHistory.resources + clickValue;
  newHistory.clicks = newHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
