import {
  UPDATE_GAME_SCHEMA
} from './actionTypes';

export function updateGameSchema(dispatch, data) {
  dispatch({
    type: UPDATE_GAME_SCHEMA,
    payload: data
  });
}
