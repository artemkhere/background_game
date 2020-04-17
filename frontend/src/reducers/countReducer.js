import initialState from './initialState';
import { ADD_TO_COUNT } from '../actions/actionTypes';

export default function count(state = initialState.count, action) {
  switch (action.type) {
    case ADD_TO_COUNT:
      return state + 1;
    default:
      return state;
  }
}
