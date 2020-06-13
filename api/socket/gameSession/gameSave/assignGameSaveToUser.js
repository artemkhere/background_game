import getDB from '../../../../dbConnection.js';

export default async function assignGameSaveToUser(gameSaveID, userID) {
  const db = getDB();
  
  const gameSave = await db.oneOrNone(
    "SELECT * FROM game_saves WHERE id = $1",
    [gameSaveID]
  );

  if (gameSave && gameSave.user_id) { return undefined; }

  await db.none(`
    UPDATE users
    SET game_save_id = $1
    WHERE id = $2
  `,
    [gameSaveID, userID]
  );

  return await db.one(`
    UPDATE game_saves
    SET user_id = $1
    WHERE id = $2
    RETURNING id, resources, game_state, game_history, created_on, last_interaction
  `,
    [userID, gameSaveID]
  );
}
