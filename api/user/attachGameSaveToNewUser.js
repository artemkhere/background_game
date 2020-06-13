import getDB from '../../dbConnection.js';

export default async function attachGameSaveToNewUser(gameSaveID, newUser) {
  const db = getDB();
  let gameSave = undefined;

  try {
    gameSave = await db.one(`
      SELECT user_id
      FROM game_saves
      WHERE id = $1`,
      [gameSaveID]
    );
  } catch (error) {
    return { status: 500, data: { message: 'Could not fetch game save.' } };
  }

  if (!gameSave.user_id && !newUser.game_save_id) {
    try {
      await db.none(`
        UPDATE game_saves
        SET user_id = $1
        WHERE id = $2
      `,
        [newUser.id, gameSaveID]
      );

      await db.none(`
        UPDATE users
        SET game_save_id = $1
        WHERE id = $2
      `,
        [gameSaveID, newUser.id]
      );
    } catch (error) {
      return { status: 500, data: { message: 'Failed attaching Game Save to target user.' } };
    }
  } else {
    return { status: 500, data: { message: 'User or gameSave is not valid.' } };
  }
}
