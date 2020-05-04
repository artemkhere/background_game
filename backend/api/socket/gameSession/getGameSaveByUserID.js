import db from '../../../dbConnection.js';

export default async function getGameSaveByUserID(userID) {
  return await db.oneOrNone(
    "SELECT * FROM game_saves WHERE user_id = $1",
    [userID]
  );
}
