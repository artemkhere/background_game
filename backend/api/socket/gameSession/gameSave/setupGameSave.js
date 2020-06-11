import createGameSave from './createGameSave.js';
import updateGameSave from './updateGameSave.js';
import getGameSaveByUserID from './getGameSaveByUserID.js';
import getGameSaveBySaveID from './getGameSaveBySaveID.js';
import assignGameSaveToUser from './assignGameSaveToUser.js';
import updateGameSaveLastInteraction from './updateGameSaveLastInteraction.js';

export default async function setupGameSave(userID, gameSaveID, userLoggedIn) {
  let gameSave;
  try {
    if (userLoggedIn) {
      gameSave = await getGameSaveByUserID(userID);

      if (!gameSave && gameSaveID) {
        gameSave = await assignGameSaveToUser(gameSaveID, userID);
      } else if (!gameSave) {
        gameSave = await createGameSave(userID);
      } else {
        await updateGameSaveLastInteraction(gameSave.id)
      }
    }

    if (!userLoggedIn && gameSaveID) {
      gameSave = await getGameSaveBySaveID(gameSaveID);
    }

    if (!gameSave) { gameSave = await createGameSave(); }

    return gameSave;
  } catch (error) {
    return undefined;
  }
}
