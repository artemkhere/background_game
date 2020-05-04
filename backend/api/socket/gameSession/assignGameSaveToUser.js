import db from '../../../dbConnection.js';

export default async function assignGameSaveToUser(gameSaveID, userID) {
  db.none(`
    UPDATE users
    SET game_save_id = $1
    WHERE id = $2
  `,
    [gameSaveID, userID]
  );
}
