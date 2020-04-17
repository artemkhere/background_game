import { combineReducers } from 'redux';
import stuff from './stuffReducer';
import count from './countReducer';
import socket from './socketReducer';

const rootReducer = combineReducers({
  stuff,
  count,
  socket
});

export default rootReducer;
