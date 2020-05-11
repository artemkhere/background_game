import handleAreaClicked from './handleAreaClicked.js';
import handleBuyItem from './handleBuyItem.js';
import handleDisconnect from './handleDisconnect.js';
import createGameSave from './createGameSave.js';
import getGameSaveByUserID from './getGameSaveByUserID.js';
import assignGameSaveToUser from './assignGameSaveToUser.js';
import updateGameSaveLastInteraction from './updateGameSaveLastInteraction.js';
import verifyUser from './verifyUser.js';
import setupGameSchema from './setupGameSchema.js';

export default async function handleSetupGameSession(socket) {
  socket.on('startGameSession', async (data) => {
    if (!data) {
      socket.emit('gameSessionError', { message: 'Missing data to start the Game Session.' });
      socket.disconnect(true);
      return;
    }

    let resources = 0;
    const setResources = (newValue) => { resources = newValue; }
    let gameState = { items: [] };
    const setGameState = (newState) => { gameState = newState; }
    let gameSave;

    const { userID, token } = data;
    const userLoggedIn = userID !== 0 && token;

    if (userLoggedIn && !verifyUser(userID, token)) {
      socket.emit('gameSessionError', { message: 'Failed user verification.' });
      socket.disconnect();
      return;
    }

    if (userLoggedIn) {
      gameSave = await getGameSaveByUserID(userID);

      if (!gameSave) {
        gameSave = await createGameSave(userID);
        await assignGameSaveToUser(gameSave.id, userID)
      } else {
        await updateGameSaveLastInteraction(gameSave.id)
      }
    } else {
      gameSave = await createGameSave();
    }

    const gameSaveID = gameSave.id;
    resources = gameSave.resources;
    gameState = gameSave.game_state;
    socket.emit('updateGameSession', { resources, gameState, gameSaveID });

    const gameSchema = setupGameSchema(gameSave);
    socket.emit('updateGameSchema', gameSchema);

    socket.on('areaClicked', () => {
      handleAreaClicked(resources, setResources, gameState, gameSaveID, socket);
    });

    socket.on('buyItem', (data) => {
      handleBuyItem(
        resources,
        setResources,
        gameState,
        setGameState,
        gameSaveID,
        socket,
        data
      );
    });

    socket.on('disconnect', () => {
      handleDisconnect(resources, gameState, gameSave);
    });
  });
}
