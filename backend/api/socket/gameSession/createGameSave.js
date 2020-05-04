import db from '../../../dbConnection.js';

export default async function createGameSave(
  userID,
  resources = 0,
  gameState = { items: [] }
) {
  let gameSave;
  const now = Date.now() / 1000.0;

  if (userID) {
    gameSave = await db.one(`
      INSERT
      INTO game_saves(user_id, resources, game_state, created_on, last_interaction)
      VALUES($1, $2, $3, to_timestamp($4), to_timestamp($5))
      RETURNING id, resources, game_state
    `,
      [userID, resources, gameState, now, now]
    );
  } else {
    gameSave = await db.one(`
      INSERT
      INTO game_saves(resources, game_state, created_on, last_interaction)
      VALUES($1, $2, to_timestamp($3), to_timestamp($4))
      RETURNING id, resources, game_state
    `,
      [resources, gameState, now, now]
    );
  }

  return gameSave;
}
