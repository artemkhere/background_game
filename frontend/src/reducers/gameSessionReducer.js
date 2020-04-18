import initialState from './initialState';
import {
  UPDATE_GAME_SESSION_STATE
} from '../actions/actionTypes';

export default function count(state = initialState.gameSession, action) {
  switch (action.type) {
    case UPDATE_GAME_SESSION_STATE:
      return Object.assign({}, state, {
        clicks: action.payload.clicks
      });
    default:
      return state;
  }
}
