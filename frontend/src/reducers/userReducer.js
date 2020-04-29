import initialState from './initialState';
import {
  SET_USER_DATA, SET_USER_LOGGED_IN
} from '../actions/actionTypes';

export default function count(state = initialState.user, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        id: action.payload.id,
        email: action.payload.email,
        loggedIn: action.payload.loggedIn
      });
    case SET_USER_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.payload
      });
    default:
      return state;
  }
}
