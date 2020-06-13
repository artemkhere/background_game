import db from '../../../../dbConnection.js';

export default async function getGameSaveBySaveID(gameSaveID) {
  const gameSave = await db.oneOrNone(
    "SELECT * FROM game_saves WHERE id = $1",
    [gameSaveID]
  );

  if (gameSave && !gameSave.user_id) {
    return gameSave;
  } else {
    return undefined;
  }
}
