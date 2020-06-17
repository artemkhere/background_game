import getDB from '../../../../dbConnection.js';

export default function updateGameSave(gameSessionState, gameSave) {
  // nothing to do
  if (!gameSessionState || !gameSave) { return; }

  const { getResources, getGameState, getGameHistory } = gameSessionState;
  const db = getDB();

  db.none(`
    UPDATE game_saves
    SET resources = $1, game_state = $2, game_history = $3, last_interaction = to_timestamp($4)
    WHERE id = $5
  `,
    [getResources(), getGameState(), getGameHistory(), Date.now() / 1000.0, gameSave.id]
  );
}
