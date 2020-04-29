import { combineReducers } from 'redux';
import socket from './socketReducer';
import gameSession from './gameSessionReducer';
import applicationState from './applicationStateReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  socket,
  gameSession,
  applicationState,
  user
});

export default rootReducer;
