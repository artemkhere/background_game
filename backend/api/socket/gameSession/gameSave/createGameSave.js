import db from '../../../../dbConnection.js';
import initialGameState from '../../../../initialStates/gameState.js';
import initialGameHistory from '../../../../initialStates/gameHistory.js';

export default async function createGameSave(
  userID,
  resources = 0,
  gameState = initialGameState,
  gameHistory = initialGameHistory
) {
  let gameSave;
  const now = Date.now() / 1000.0;

  if (userID) {
    gameSave = await db.one(`
      INSERT
      INTO game_saves(user_id, resources, game_state, game_history, created_on, last_interaction)
      VALUES($1, $2, $3, $4, to_timestamp($5), to_timestamp($6))
      RETURNING id, resources, game_state, game_history
    `,
      [userID, resources, gameState, gameHistory, now, now]
    );
  } else {
    gameSave = await db.one(`
      INSERT
      INTO game_saves(resources, game_state, game_history, created_on, last_interaction)
      VALUES($1, $2, $3, to_timestamp($4), to_timestamp($5))
      RETURNING id, resources, game_state, game_history
    `,
      [resources, gameState, gameHistory, now, now]
    );
  }

  return gameSave;
}
