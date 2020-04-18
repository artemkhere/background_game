import {
  UPDATE_GAME_SESSION_STATE
} from './actionTypes';

export function updateGameSessionState(dispatch, data) {
  dispatch({
    type: UPDATE_GAME_SESSION_STATE,
    payload: data
  });
}
