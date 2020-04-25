import { combineReducers } from 'redux';
import socket from './socketReducer';
import gameSession from './gameSessionReducer';
import applicationState from './applicationStateReducer';

const rootReducer = combineReducers({
  socket,
  gameSession,
  applicationState
});

export default rootReducer;
