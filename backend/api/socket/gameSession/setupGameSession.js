import handleAreaClicked from './handleAreaClicked.js';
import handleDisconnect from './handleDisconnect.js';
import createGameSave from './gameSave/createGameSave.js';
import getGameSaveByUserID from './gameSave/getGameSaveByUserID.js';
import assignGameSaveToUser from './gameSave/assignGameSaveToUser.js';
import updateGameSaveLastInteraction from './gameSave/updateGameSaveLastInteraction.js';
import verifyUser from './verifyUser.js';
import handleItemAction from './items/handleItemAction.js';
import initiateGameSessionState from './initiateGameSessionState.js';
import setGameSessionStateReference from './setGameSessionStateReference.js';

export default async function handleSetupGameSession(socket) {
  socket.on('startGameSession', async (data) => {
    if (!data) {
      socket.emit('gameSessionError', { message: 'Missing data to start the Game Session.' });
      socket.disconnect(true);
      return;
    }

    const { userID, token } = data;
    const userLoggedIn = userID !== 0 && token;
    if (userLoggedIn && !verifyUser(userID, token)) {
      socket.emit('gameSessionError', { message: 'Failed user verification.' });
      socket.disconnect();
      return;
    }

    let gameSave;
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

    let gameSessionState = initiateGameSessionState(
      gameSave.id,
      gameSave.resources,
      gameSave.game_state,
      gameSave.game_history
    );
    const handleUpdateGameSession = setGameSessionStateReference(gameSessionState, socket);
    handleUpdateGameSession();

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

    socket.on('disconnect', () => {
      handleDisconnect(gameSessionState, gameSave);
    });
  });
}
