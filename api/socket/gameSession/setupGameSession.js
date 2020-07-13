import verifyUser from './verifyUser.js';
import setupGameSave from './gameSave/setupGameSave.js';
import updateGameSave from './gameSave/updateGameSave.js';
import initiateGameSessionState from './initiateGameSessionState.js';
import setGameSessionStateReference from './setGameSessionStateReference.js';

// HARVEST
import handleAreaClicked from './harvest/handleAreaClicked.js';
import handleHarvestResources from './harvest/harvestResources/handleHarvestResources.js';
import handleItemAction from './harvest/items/handleItemAction.js';
import handleStructureAction from './harvest/structures/handleStructureAction.js';
import handleConsumableAction from './harvest/consumables/handleConsumableAction.js';

// ARENA
import handleBattleAction from './arena/battle/handleBattleAction.js';
import handleCharacterAction from './arena/character/handleCharacterAction.js';

let autoSave;
const save = (gameSessionState, gameSave) => {
  return () => {
    updateGameSave(gameSessionState, gameSave);
  }
}

let autoHarvest;
const harvestResources = (
  gameSessionState,
  handleUpdateGameSession,
  socket
) => {
  return () => {
    handleHarvestResources(
      gameSessionState,
      handleUpdateGameSession,
      socket
    );
  }
}

export default async function handleSetupGameSession(socket) {
  socket.on('startGameSession', async (data) => {
    if (!data) {
      socket.emit('gameSessionError', { message: 'Missing data to start the Game Session.' });
      socket.disconnect(true);
      return;
    }

    const { userID, gameSaveID, token } = data;
    const userLoggedIn = userID !== 0 && token;
    if (userLoggedIn && !verifyUser(userID, token)) {
      socket.emit('gameSessionError', { message: 'Failed user verification.' });
      socket.disconnect();
      return;
    }

    let gameSave;
    try {
      gameSave = await setupGameSave(userID, gameSaveID, userLoggedIn);
      if (!gameSave) { throw new Error('No Game Save.'); }
    } catch (error) {
      socket.emit('gameSessionError', { message: 'Failed fetching Game Save.' });
      socket.disconnect();
      return;
    }

    let gameSessionState = initiateGameSessionState(
      gameSave.id,
      gameSave.resources,
      gameSave.game_state,
      gameSave.game_history
    );
    const handleUpdateGameSession = setGameSessionStateReference(gameSessionState, socket);

    // HARVEST
    handleHarvestResources(
      gameSessionState,
      handleUpdateGameSession,
      socket
    );
    handleUpdateGameSession();

    autoHarvest = setInterval(harvestResources(
      gameSessionState,
      handleUpdateGameSession,
      socket
    ), 1000);

    socket.on('areaClicked', () => {
      handleAreaClicked(
        gameSessionState,
        handleUpdateGameSession,
        socket
      );
    });

    socket.on('itemAction', (data) => {
      handleItemAction(
        gameSessionState,
        handleUpdateGameSession,
        data,
        socket
      );
    });

    socket.on('structureAction', (data) => {
      handleStructureAction(
        gameSessionState,
        handleUpdateGameSession,
        data,
        socket
      );
    });

    socket.on('consumableAction', (data) => {
      handleConsumableAction(
        gameSessionState,
        handleUpdateGameSession,
        data,
        socket
      );
    });

    // ARENA
    socket.on('battleAction', (data) => {
      handleBattleAction(
        gameSessionState,
        handleUpdateGameSession,
        data,
        socket
      );
    });

    socket.on('characterAction', (data) => {
      handleCharacterAction(
        gameSessionState,
        handleUpdateGameSession,
        data,
        socket
      );
    });

    // UNIVERSAL
    autoSave = setInterval(save(gameSessionState, gameSave), 60000);

    ['disconnect', 'connect_timeout', 'connect_error', 'error'].forEach((eventName) => {
      socket.on(eventName, (data) => {
        updateGameSave(gameSessionState, gameSave);
        clearInterval(autoSave);
        clearInterval(autoHarvest);
      });
    });
  });
}
