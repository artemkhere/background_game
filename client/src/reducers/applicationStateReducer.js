import initialState from './initialState';
import {
  SET_CURRENT_SCREEN, SET_APPLICATION_ERROR, SET_APPLICATION_LOADING
} from '../actions/actionTypes';

export default function count(state = initialState.applicationState, action) {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      return Object.assign({}, state, {
        currentScreen: action.payload,
        loading: false,
        error: false
      });
    case SET_APPLICATION_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });
    case SET_APPLICATION_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
        error: false
      });
    default:
      return state;
  }
}
