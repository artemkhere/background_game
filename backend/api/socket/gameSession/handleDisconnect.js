import db from '../../../dbConnection.js';

export default function handleDisconnect(resources, gameState, gameSave) {
  // nothing to do
  if (!gameSave) { return; }

  db.none(`
    UPDATE game_saves
    SET resources = $1, game_state = $2, last_interaction = to_timestamp($3)
    WHERE id = $4
  `,
    [resources, gameState, Date.now() / 1000.0, gameSave.id]
  );
}
