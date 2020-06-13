import initialState from './initialState';
import { UPDATE_GAME_SESSION } from '../actions/actionTypes';

export default function count(state = initialState.gameSession, action) {
  switch (action.type) {
    case UPDATE_GAME_SESSION:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
