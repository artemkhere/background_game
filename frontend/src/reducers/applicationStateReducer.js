import initialState from './initialState';
import {
  SET_CURRENT_SCREEN
} from '../actions/actionTypes';

export default function count(state = initialState.applicationState, action) {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      return Object.assign({}, state, {
        currentScreen: action.payload
      });
    default:
      return state;
  }
}
