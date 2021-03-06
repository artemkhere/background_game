import getDB from '../../../../dbConnection.js';

export default async function updateGameSaveLastInteraction(gameSaveID) {
  const db = getDB();

  db.none(`
    UPDATE game_saves
    SET last_interaction = to_timestamp($1)
    WHERE id = $2
  `,
    [Date.now() / 1000.0, gameSaveID]
  );
}
