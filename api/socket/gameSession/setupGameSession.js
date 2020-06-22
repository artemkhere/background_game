import handleAreaClicked from './handleAreaClicked.js';
import handleHarvestResources from './harvestResources/handleHarvestResources.js';
import setupGameSave from './gameSave/setupGameSave.js';
import updateGameSave from './gameSave/updateGameSave.js';
import verifyUser from './verifyUser.js';
import handleItemAction from './items/handleItemAction.js';
import initiateGameSessionState from './initiateGameSessionState.js';
import setGameSessionStateReference from './setGameSessionStateReference.js';
import handleStructureAction from './structures/handleStructureAction.js';
import handleConsumableAction from './consumables/handleConsumableAction.js';
import initiateBattle from './arena/initiateBattle.js';

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
    handleHarvestResources(
      gameSessionState,
      handleUpdateGameSession,
      socket
    );
    handleUpdateGameSession();

    autoSave = setInterval(save(gameSessionState, gameSave), 60000);
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

    socket.on('initiateBattle', (data) => {
      const gameState = initiateBattle(gameSessionState, socket);
      handleUpdateGameSession();
      socket.emit('battleStarted', gameState);
    });

    ['disconnect', 'connect_timeout', 'connect_error', 'error'].forEach((eventName) => {
      socket.on(eventName, (data) => {
        updateGameSave(gameSessionState, gameSave);
        clearInterval(autoSave);
        clearInterval(autoHarvest);
      });
    });
  });
}
