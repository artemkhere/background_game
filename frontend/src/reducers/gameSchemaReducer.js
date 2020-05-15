import initialState from './initialState';
import {
  UPDATE_GAME_SCHEMA
} from '../actions/actionTypes';

export default function count(state = initialState.gameSchema, action) {
  switch (action.type) {
    case UPDATE_GAME_SCHEMA:
      return Object.assign({}, state, {
        itemShop: action.payload.itemShop
      });
    default:
      return state;
  }
}
