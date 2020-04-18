import { combineReducers } from 'redux';
import socket from './socketReducer';
import gameSession from './gameSessionReducer';

const rootReducer = combineReducers({
  socket,
  gameSession
});

export default rootReducer;
