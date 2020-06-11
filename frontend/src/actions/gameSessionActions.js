import { UPDATE_GAME_SESSION } from './actionTypes';

export function updateGameSession(dispatch, data) {
  // store gameSaveID for future sessions if user is not logged in
  if (data.gameSaveID) {
    localStorage.setItem('gameSaveID', data.gameSaveID);
  }

  dispatch({
    type: UPDATE_GAME_SESSION,
    payload: data
  });
}
