import db from '../../../dbConnection.js';

export default function handleDisconnect(gameSessionState, gameSave) {
  // nothing to do
  if (!gameSessionState || !gameSave) { return; }

  const { resources, gameState, gameHistory } = gameSessionState;

  db.none(`
    UPDATE game_saves
    SET resources = $1, game_state = $2, game_history = $3, last_interaction = to_timestamp($4)
    WHERE id = $5
  `,
    [resources, gameState, gameHistory, Date.now() / 1000.0, gameSave.id]
  );
}
