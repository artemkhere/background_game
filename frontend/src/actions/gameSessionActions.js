import { UPDATE_GAME_SESSION } from './actionTypes';

export function updateGameSession(dispatch, data) {
  dispatch({
    type: UPDATE_GAME_SESSION,
    payload: data
  });
}
