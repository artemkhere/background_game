import { combineReducers } from 'redux';
import socket from './socketReducer';
import gameSession from './gameSessionReducer';
import gameSchema from './gameSchemaReducer';
import applicationState from './applicationStateReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  socket,
  gameSession,
  gameSchema,
  applicationState,
  user
});

export default rootReducer;
