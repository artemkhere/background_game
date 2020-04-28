import initialState from './initialState';
import {
  SET_USER_DATA
} from '../actions/actionTypes';

export default function count(state = initialState.user, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        id: action.payload.id,
        email: action.payload.email
      });
    default:
      return state;
  }
}
