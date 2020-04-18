import initialState from './initialState';
import {
  SOCKET_SET_LOADING, SOCKET_CONNECT, SOCKET_SET_ERROR
} from '../actions/actionTypes';

export default function count(state = initialState.socket, action) {
  switch (action.type) {
    case SOCKET_SET_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
        error: false
      });
    case SOCKET_CONNECT:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.payload
      });
    case SOCKET_SET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    default:
      return state;
  }
}
